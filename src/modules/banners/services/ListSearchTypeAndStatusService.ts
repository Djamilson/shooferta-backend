import { Banner } from '@modules/banners/infra/typeprisma/entities/Banner';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { IBannersRepository } from '../repositories/IBannersRepository';

type IProps = {
  type: string;
  status: boolean;
};

@injectable()
class ListSearchTypeAndStatusService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ type, status }: IProps): Promise<Banner[] | null> {
    const cachekey = `banners:${type}-${status}`;

    let banners = await this.cacheProvider.recover<any>(cachekey);

    if (!banners) {
      const newBanners = await this.bannersRepository.allSearchTypeAndStatus({
        type,
        status,
      });

      banners = instanceToPlain(plainToInstance(Banner, newBanners));

      await this.cacheProvider.save(
        cachekey,
        instanceToPlain(plainToInstance(Banner, newBanners)),
      );
    }

    return banners;
  }
}

export { ListSearchTypeAndStatusService };
