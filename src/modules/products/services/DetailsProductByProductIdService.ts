import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getUrlImage } from '../../../utils/getUrlImage';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { IProductsRepository } from '../repositories/IProductsRepository';

type IRequest = {
  product_id: string;
};

@injectable()
class DetailsProductByProductIdService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ product_id }: IRequest): Promise<any> {
    try {
      const cachekey = `product:${product_id}`;

      let product = await this.cacheProvider.recover<any>(cachekey);

      if (!product) {
        const newProduct =
          await this.productsRepository.findDetailsProductByProductId(
            product_id,
          );

        if (!newProduct) {
          return undefined;
        }

        const meProduct = {
          ...newProduct,
          thumbnail_url:
            newProduct.photos &&
            newProduct.photos.length > 0 &&
            getUrlImage(newProduct.photos[0].name),
          photos: instanceToPlain(plainToInstance(Photo, newProduct.photos)),
        };

        await this.cacheProvider.save(cachekey, meProduct);
        product = meProduct;
      }

      return product;
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { DetailsProductByProductIdService };
