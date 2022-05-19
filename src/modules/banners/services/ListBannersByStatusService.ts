import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../infra/typeprisma/entities/Banner';
import { IBannersRepository } from '../repositories/IBannersRepository';

type IProps = { status: boolean };

@injectable()
class ListBannersByStatusService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ status }: IProps): Promise<Banner[] | null> {
    const banners = await this.bannersRepository.allByStatus(status);

    return banners;
  }
}

export { ListBannersByStatusService };
