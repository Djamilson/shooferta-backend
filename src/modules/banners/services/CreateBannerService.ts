import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../infra/typeprisma/entities/Banner';
import {
  IBannersRepository,
  IPropsSearchNameAndType,
} from '../repositories/IBannersRepository';

@injectable()
class CreateBannerService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ name, type }: IPropsSearchNameAndType): Promise<Banner> {
    try {
      if (!name) {
        throw new AppError('Only photo can null.', 401);
      }

      if (name) {
        await this.storageProvider.deleteFile(name);
      }

      const filename = await this.storageProvider.saveFile(name);

      const cachekey = `banners`;

      await this.cacheProvider.invalidatePrefix(cachekey);

      return this.bannersRepository.create({ name: filename, type });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreateBannerService };
