import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../infra/typeprisma/entities/Banner';
import { IBannersRepository } from '../repositories/IBannersRepository';

interface IRequest {
  id: string;
  type: string;
}

@injectable()
class UpdateBannerTypeService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id: oldId, type }: IRequest): Promise<Banner> {
    const checkBannerExists = await this.bannersRepository.findById(oldId);

    if (!checkBannerExists) {
      throw new AppError('Banner not found');
    }

    const cachekey = `banners`;

    await this.cacheProvider.invalidatePrefix(cachekey);

    return this.bannersRepository.update({
      id: oldId,
      updateData: { type },
    });
  }
}

export { UpdateBannerTypeService };
