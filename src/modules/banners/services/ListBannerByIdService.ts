import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../infra/typeprisma/entities/Banner';
import { IBannersRepository } from '../repositories/IBannersRepository';

@injectable()
class ListBannerByIdService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,
  ) {}

  async execute(id: string): Promise<Banner | null> {
    const banner = await this.bannersRepository.findById(id);

    return plainToInstance(Banner, banner);
  }
}

export { ListBannerByIdService };
