import { Banner } from '@modules/banners/infra/typeprisma/entities/Banner';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { IBannersRepository } from '../repositories/IBannersRepository';

@injectable()
class ListBannersService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<Banner[] | null> {
    const banners = await this.bannersRepository.allBanners();

    return banners;
  }
}

export { ListBannersService };
