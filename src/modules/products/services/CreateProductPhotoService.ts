import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { IPhotosRepository } from '../repositories/IPhotosRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
  photoFilename?: string;
}

@injectable()
class CreateProductPhotoService {
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

  public async execute({
    product_id,
    photoFilename,
  }: IRequest): Promise<Photo> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product does not exists.', 401);
    }

    if (!photoFilename) {
      throw new AppError('Photo does not exists.', 402);
    }

    const filename = await this.storageProvider.saveFile(photoFilename);
    const photo = await this.photosRepository.create({
      product_id,
      name: filename,
    });

    const cachekey = `products`;

    await this.cacheProvider.invalidatePrefix(cachekey);

    return photo;
  }
}

export { CreateProductPhotoService };
