import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICategoriesProductsRepository } from '../repositories/ICategoriesProductsRepository';

interface IRequest {
  category_id: string;
  product_id: string;
}

@injectable()
class DeleteCategoryProductService {
  constructor(
    @inject('CategoriesProductsRepository')
    private categoriesProductsRepository: ICategoriesProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ category_id, product_id }: IRequest): Promise<void> {
    const checkCategoryProductExists =
      await this.categoriesProductsRepository.findById({
        category_id,
        product_id,
      });

    if (!checkCategoryProductExists) {
      throw new AppError('CategoryProduct does not exists.', 401);
    }

    await this.categoriesProductsRepository.delete({ category_id, product_id });

    const cachekey = `products`;
    await this.cacheProvider.invalidatePrefix(cachekey);

    const cachekeyProduct = `product:${checkCategoryProductExists.product_id}`;
    await this.cacheProvider.invalidate(cachekeyProduct);

    return;
  }
}

export { DeleteCategoryProductService };
