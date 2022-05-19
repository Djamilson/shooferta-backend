import { Photo } from '@modules/products/infra/typeprisma/entities/Photo';
import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getUrlImage } from 'utils/getUrlImage';
import IForgottenCartsRepository from '../repositories/IForgottenCartsRepository';

interface IRequest {
  user_id: string;
}

export type IProductAmount = {
  product: Product;
  amount: number;
};

@injectable()
class AllForgottenCartService {
  constructor(
    @inject('ForgottenCartsRepository')
    private forgottenCartsRepository: IForgottenCartsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<any> {
    try {
      const list = await this.forgottenCartsRepository.allForgottenCarts(
        user_id,
      );

      if (!list?.length) {
        throw new AppError('Could not find product with the ids');
      }

      const productIds = list?.map(product => product.product_id);

      const existentProducts = await this.productsRepository.findByIds(
        productIds,
      );

      if (!existentProducts.length) {
        throw new AppError('Empty cart');
      }

      const productAmountLists = existentProducts?.map(product => {
        const categories =
          product?.categories &&
          product?.categories.map(category => {
            return category.category;
          });

        return {
          product: {
            ...product,
            categories,
            thumbnail_url:
              product?.photos &&
              product.photos?.length > 0 &&
              getUrlImage(product.photos[0].name),
            photos: instanceToPlain(plainToInstance(Photo, product.photos)),
          },
          amount: list.find(p => p.product_id === product.id)!.amount,
        };
      });

      return productAmountLists;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { AllForgottenCartService };
