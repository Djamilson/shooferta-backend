import { Banner } from '@modules/banners/infra/typeprisma/entities/Banner';
import { inject, injectable } from 'tsyringe';
import { IBannersRepository } from '../repositories/IBannersRepository';

@injectable()
class ListBannersService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,
  ) {}

  async execute(): Promise<Banner[] | null> {
    const banners = await this.bannersRepository.allBanners();

    return banners;
  }
}

export { ListBannersService };
