import { ICreateDescriptionDTO } from '@modules/products/dtos/ICreateDTO';
import ITotalDescriptionsDTO from '@modules/products/dtos/ITotalDescriptionsDTO';
import { IDescriptionsRepository } from '@modules/products/repositories/IDescriptionsRepository';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Description } from '../entities/Description';

class DescriptionsRepository implements IDescriptionsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data;

    const result = await this.prismaRepository.description.count({
      where: {
        description: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return result;
  }

  public async allDescription(
    data: IDataPageDTO,
  ): Promise<ITotalDescriptionsDTO> {
    const { page, pageSize, query } = data;

    let descriptions = [] as Description[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      descriptions = await this.prismaRepository.description.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          description: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
        orderBy: {
          description: 'asc',
        },
      });
    }

    return {
      result: descriptions as unknown as Description[],
      total,
    };
  }

  public async findByDescription(
    description: string,
  ): Promise<Description | null> {
    const meDescription = await this.prismaRepository.description.findFirst({
      where: { description },
    });
    return meDescription as unknown as Description;
  }

  public async findById(id: string): Promise<Description | null> {
    const description = await this.prismaRepository.description.findUnique({
      where: { id },
    });
    return description as unknown as Description;
  }

  public async allDescriptions(): Promise<Description[] | null> {
    const descriptions = await this.prismaRepository.description.findMany({});
    return descriptions as unknown as Description[];
  }

  public async create(data: ICreateDescriptionDTO): Promise<Description> {
    return this.prismaRepository.description.create({
      data,
      select: {
        id: true,
        description: true,
      },
    }) as unknown as Description;
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<Description> {
    const description = await this.prismaRepository.description.update({
      where: {
        id,
      },
      data: updateData,
    });
    return description as unknown as Description;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaRepository.description.delete({
      where: {
        id,
      },
    });

    return;
  }
}

export { DescriptionsRepository };
