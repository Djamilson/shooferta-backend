import AppError from '@shared/errors/AppError';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { IPhotosRepository } from '../repositories/IPhotosRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

type IProps = {
  product_id: string;
};

@injectable()
class ListPhotosProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,
  ) {}

  public async execute({ product_id }: IProps): Promise<any> {
    try {
      const checkProductExists = await this.productsRepository.findById(
        product_id,
      );

      if (!checkProductExists) {
        throw new AppError('Product does not exists.', 401);
      }

      const list = await this.photosRepository.findAllByProductId(product_id);


      return plainToInstance(Photo, list);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListPhotosProductsService };
