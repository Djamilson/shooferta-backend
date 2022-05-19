import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../infra/typeprisma/entities/Banner';
import { IBannersRepository } from '../repositories/IBannersRepository';

interface IRequest {
  id: string;
  photoFilename?: string;
}

@injectable()
class UpdateBannerPhotoService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id: oldId,
    photoFilename,
  }: IRequest): Promise<Banner> {
    try {
      if (!photoFilename) {
        throw new AppError('Only photo can null.', 401);
      }

      const checkBannerExists = await this.bannersRepository.findById(oldId);

      if (!checkBannerExists) {
        throw new AppError('Only authenticated banner can change avatar.', 402);
      }

      if (checkBannerExists.name) {
        await this.storageProvider.deleteFile(checkBannerExists.name);
      }

      const filename = await this.storageProvider.saveFile(photoFilename);

      const cachekey = `banners`;

      await this.cacheProvider.invalidatePrefix(cachekey);

      return this.bannersRepository.update({
        id: oldId,
        updateData: { name: filename },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateBannerPhotoService };
