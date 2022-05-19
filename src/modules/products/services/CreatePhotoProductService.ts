import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { IPhotosRepository } from '../repositories/IPhotosRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  productId: string;
  photoFilename: string;
}

@injectable()
class CreatePhotoProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ productId, photoFilename }: IRequest): Promise<Photo> {
    try {
      const productExists = await this.productsRepository.findById(productId);

      if (!productExists) {
        throw new AppError('ProductExists not exists.', 401);
      }

      const filename = await this.storageProvider.saveFile(photoFilename);

      const photo = await this.photosRepository.create({
        name: filename,
        product_id: productExists.id,
      });

      const cachekey = `products`;
      const cachekeyProduct = `product:${productId}`;

      await this.cacheProvider.invalidate(cachekeyProduct);
      await this.cacheProvider.invalidatePrefix(cachekey);

      return photo;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreatePhotoProductService };
