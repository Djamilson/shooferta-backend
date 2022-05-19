import {
  IPoliticsRepository,
  ITotalPoliticsDTO,
} from '@modules/politics/repositories/IPoliticsRepository';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import {
  Politic as PoliticPrisma,
  Prisma,
} from '@shared/infra/prisma/postgres/generated/postgres';
import { Politic } from '../entities/Politic';

class PoliticsRepository implements IPoliticsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByName(name: string): Promise<Politic | null> {
    const politic = await this.prismaRepository.politic.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    return politic as unknown as Politic;
  }

  public async findById(id: string): Promise<Politic | null> {
    const politic = await this.prismaRepository.politic.findUnique({
      where: { id },
    });
    return politic as unknown as Politic;
  }

  public async allPolitics(): Promise<Politic[] | null> {
    const politics = await this.prismaRepository.politic.findMany({});
    return politics as unknown as Politic[];
  }

  public async create(data: Prisma.PoliticCreateInput): Promise<Politic> {
    return this.prismaRepository.politic.create({
      data,
    }) as unknown as Politic;
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Politic> {
    const politic = await this.prismaRepository.politic.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return politic as unknown as Politic;
  }

  public async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data;
    return this.prismaRepository.politic.count({
      where: {
        name: {
          contains: query /* Optional filter */,
          mode: 'insensitive',
        },
      },
    });
  }

  public async allPoliticsPagination(
    data: IDataPageDTO,
  ): Promise<ITotalPoliticsDTO> {
    const { page, pageSize, query } = data;

    let politics = [] as PoliticPrisma[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      politics = await this.prismaRepository.politic.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          name: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
    }

    return {
      result: politics as unknown as Politic[],
      total,
    };
  }
}

export default PoliticsRepository;
