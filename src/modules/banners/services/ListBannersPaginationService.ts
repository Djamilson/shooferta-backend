import { IInfoDTO } from '@modules/__DTOS';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../infra/typeprisma/entities/Banner';
import { IBannersRepository } from '../repositories/IBannersRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
  status: boolean;
}

interface IBannersReturn {
  banners: Banner[];
  info: IInfoDTO;
}

@injectable()
class ListBannersPaginationService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
    status,
  }: IRequest): Promise<IBannersReturn> {
    const { result, total } = await this.bannersRepository.allBannerPagination({
      page,
      pageSize,
      query,
      status,
    });

    const pages = Math.ceil(total / pageSize);

    const info = { page, pages, total, limit: pageSize };

    return { banners: plainToInstance(Banner, result), info };
  }
}

export default ListBannersPaginationService;
