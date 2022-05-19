import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { IPhotosRepository } from '../repositories/IPhotosRepository';

interface IRequest {
  photoId: string;
  priority: number;
}

@injectable()
class UpdatePriorityPhotoService {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ photoId, priority }: IRequest): Promise<Photo> {
    const checkPhotoExists = await this.photosRepository.findById(photoId);

    if (!checkPhotoExists) {
      throw new AppError('Photo not found.');
    }

    const cachekey = `products`;
    await this.cacheProvider.invalidatePrefix(cachekey);

    const cachekeyProduct = `product:${checkPhotoExists.product_id}`;
    await this.cacheProvider.invalidate(cachekeyProduct);

    return this.photosRepository.update({
      id: photoId,
      updateData: { priority },
    });
  }
}

export { UpdatePriorityPhotoService };
