import { INewOrder } from '@modules/orders/dtos/INewOrder';
import { Photo } from '@modules/products/infra/typeprisma/entities/Photo';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getUrlImage } from 'utils/getUrlImage';
import IForgottenCartsRepository from '../repositories/IForgottenCartsRepository';

type IProps = {
  user_id: string;
  products: INewOrder[];
};

@injectable()
class InitialForgottenCartService {
  constructor(
    @inject('ForgottenCartsRepository')
    private forgottenCartsRepository: IForgottenCartsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ products, user_id }: IProps): Promise<any> {
    try {
      const promises = products?.map(async item => {
        const checkProductExists = await this.productsRepository.findById(
          item.product_id,
        );

        if (checkProductExists) {
          console.log('Etrou no if');
          const checkForgottenCartExists =
            await this.forgottenCartsRepository.findByUserIdByProductId({
              product_id: item.product_id,
              user_id,
            });
          console.log('PPPPPD:', checkForgottenCartExists);

          if (checkForgottenCartExists) {
            await this.forgottenCartsRepository.update({
              id: checkForgottenCartExists.id,
              updateData: {
                amount: item.amount,
              },
            });
          } else {
            console.log('Etrou no else vai cria');
            await this.forgottenCartsRepository.create({
              user_id,
              product_id: item.product_id,
              amount: item.amount,
            });
          }
        }
      });

      const d = await Promise.all(promises);

      console.log('products>>:', d);

      /** busco a lista atualizada */

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

      const oldListUser = existentProducts?.map(product => {
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

      return oldListUser;
    } catch (error: any) {
      console.log('Errere::::', error);
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InitialForgottenCartService };
