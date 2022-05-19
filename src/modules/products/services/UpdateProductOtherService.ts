// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/typeprisma/entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

type IRequest = {
  productId: string;
  other: object;
};

@injectable()
class UpdateProductOtherService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    productId,
    other,
  }: IRequest): Promise<Product | string> {
    try {
      const checkProductExists = await this.productsRepository.findById(
        productId,
      );

      if (!checkProductExists) {
        throw new AppError('Product not exists', 401);
      }

      const product = await this.productsRepository.update({
        id: productId,
        updateData: { other },
      });

      const cachekey = `products`;
      const cachekeyProduct = `product:${productId}`;

      await this.cacheProvider.invalidate(cachekeyProduct);
      await this.cacheProvider.invalidatePrefix(cachekey);

      return product;
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateProductOtherService };
