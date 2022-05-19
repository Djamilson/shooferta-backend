import IBannerPageDTO from '@modules/banners/dtos/IBannerPageDTO';
import { ICreateBannerDTO } from '@modules/banners/dtos/ICreateBannerDTO';
import { ISearchTypeAndStatus } from '@modules/banners/dtos/ISearchTypeAndStatus';
import ITotalBannersDTO from '@modules/banners/dtos/ITotalBannersDTO';
import { IBannersRepository } from '@modules/banners/repositories/IBannersRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Banner } from '../entities/Banner';
class BannersRepository implements IBannersRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findById(id: string): Promise<Banner | null> {
    const banner = await this.prismaRepository.banner.findUnique({
      where: { id },
    });
    return banner as unknown as Banner;
  }

  public async findByName(name: string): Promise<Banner | null> {
    const banner = await this.prismaRepository.banner.findFirst({
       where: { name: { equals: name, mode: 'insensitive' } },
    });
    return banner as unknown as Banner;
  }

  public async create(data: ICreateBannerDTO): Promise<Banner> {
    return this.prismaRepository.banner.create({
      data,
    }) as unknown as Banner;
  }

  public async allBanners(): Promise<Banner[] | null> {
    const banners = await this.prismaRepository.banner.findMany({});
    return banners as unknown as Banner[];
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Banner> {
    const banner = await this.prismaRepository.banner.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return banner as unknown as Banner;
  }

  public async delete(id: string): Promise<Banner> {
    const banner = await this.prismaRepository.banner.delete({
      where: {
        id,
      },
    });
    return banner as unknown as Banner;
  }

  public async allByStatus(status: boolean): Promise<Banner[] | null> {
    const banners = await this.prismaRepository.banner.findMany({
      where: { status },
    });
    return banners as unknown as Banner[];
  }

  public async allSearchTypeAndStatus(
    data: ISearchTypeAndStatus,
  ): Promise<Banner[]> {
    const banners = await this.prismaRepository.banner.findMany({
      where: data,
      orderBy: {
        priority: 'asc',
      },
    });
    return banners as unknown as Banner[];
  }

  public async totalRegister(data: IBannerPageDTO): Promise<number> {
    const { query, status } = data;
    return this.prismaRepository.banner.count({
      where: {
        status,
        name: {
          contains: query /* Optional filter */,
          mode: 'insensitive',
        },
      },
    });
  }

  public async allBannerPagination(
    data: IBannerPageDTO,
  ): Promise<ITotalBannersDTO> {
    const { page, pageSize, query, status } = data;

    let banners = [] as Banner[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      banners = (await this.prismaRepository.banner.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          status,
          name: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      })) as unknown as Banner[];
    }

    return {
      result: banners,
      total,
    };
  }
}

export default BannersRepository;
