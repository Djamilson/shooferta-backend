import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Category } from '../infra/typeprisma/entities/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  id: string;
  photoFilename?: string;
}

@injectable()
class UpdateCategoryPhotoService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, photoFilename }: IRequest): Promise<Category> {
    try {
      if (!photoFilename) {
        throw new AppError('Only photo can null.', 401);
      }

      const category = await this.categoriesRepository.findById(id);

      if (!category) {
        throw new AppError(
          'Only authenticated category can change avatar.',
          402,
        );
      }

      if (category.photo) {
        await this.storageProvider.deleteFile(category.photo);
      }

      const filename = await this.storageProvider.saveFile(photoFilename);

      const cachekey = `categories`;
      const cachekeyCategory = `category:${id}`;

      await this.cacheProvider.invalidatePrefix(cachekey);
      await this.cacheProvider.invalidate(cachekeyCategory);

      return this.categoriesRepository.update({
        id,
        updateData: { photo: filename },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateCategoryPhotoService };
