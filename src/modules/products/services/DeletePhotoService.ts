import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPhotosRepository } from '../repositories/IPhotosRepository';

interface IRequest {
  photoId: string;
}

@injectable()
class DeletePhotoService {
  constructor(
    @inject('PhotosRepository')
    private photosProductsRepository: IPhotosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ photoId }: IRequest): Promise<void> {
    try {
      const checkPhotoExists = await this.photosProductsRepository.findById(
        photoId,
      );

      if (!checkPhotoExists) {
        throw new AppError('Photo does not exists.', 401);
      }

      await this.photosProductsRepository.delete(photoId);

      if (checkPhotoExists.name) {
        await this.storageProvider.deleteFile(checkPhotoExists.name);
      }

      const cachekey = `products`;
      await this.cacheProvider.invalidatePrefix(cachekey);

      const cachekeyProduct = `product:${checkPhotoExists.product_id}`;
      await this.cacheProvider.invalidate(cachekeyProduct);

      return;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { DeletePhotoService };
