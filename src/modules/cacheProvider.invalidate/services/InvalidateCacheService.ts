import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyBanners = `banners`;
      const cachekeyProducts = `products`;
      const cachekeyCategories = `categories`;

      await this.cacheProvider.invalidatePrefix(cachekeyBanners);
      await this.cacheProvider.invalidatePrefix(cachekeyProducts);
      await this.cacheProvider.invalidatePrefix(cachekeyCategories);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheService };
