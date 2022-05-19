import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getUrlImage } from '../../../utils/getUrlImage';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListProductByIdService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<any> {
    try {
      const product = await this.productsRepository.findById(id);

      if (!product) {
        return undefined;
      }

      const categories =
        product?.categories &&
        product?.categories.map(category => {
          return category.category;
        });

      return {
        ...product,
        categories,
        thumbnail_url:
          product?.photos &&
          product.photos?.length > 0 &&
          getUrlImage(product.photos[0].name),
        photos: instanceToPlain(plainToInstance(Photo, product.photos)),
      };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListProductByIdService };
