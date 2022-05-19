import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CategoryProduct } from '../infra/typeprisma/entities/CategoryProduct';
import { ICategoriesProductsRepository } from '../repositories/ICategoriesProductsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  categoryId: string;
  productId: string;
}

@injectable()
class CreateCategoryProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CategoriesProductsRepository')
    private categoriesProductsRepository: ICategoriesProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ productId, categoryId }: IRequest): Promise<CategoryProduct> {
    const checkProductExists = await this.productsRepository.findById(
      productId,
    );

    if (!checkProductExists) {
      throw new AppError('Product does not exists.', 401);
    }

    const checkCategoryExists = await this.categoriesRepository.findById(
      categoryId,
    );

    if (!checkCategoryExists) {
      throw new AppError('Category does not exists.', 402);
    }

    const checkCategoryProductExists =
      await this.categoriesProductsRepository.findByCategoryIdInProductId({
        category_id: checkCategoryExists.id,
        product_id: checkProductExists.id,
      });

    if (checkCategoryProductExists) {
      throw new AppError('Product alread in category exists.', 403);
    }

    const categoryProduct = await this.categoriesProductsRepository.create({
      category_id: checkCategoryExists.id,
      product_id: checkProductExists.id,
    });

    const cachekey = `products`;

    await this.cacheProvider.invalidatePrefix(cachekey);

    return categoryProduct;
  }
}

export { CreateCategoryProductService };
