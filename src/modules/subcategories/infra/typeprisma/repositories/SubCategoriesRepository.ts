import { ICreateSubCategoryDTO } from '@modules/subcategories/dtos/ICreateSubCategoryDTO';
import ITotalSubCategoriesDTO from '@modules/subcategories/dtos/ITotalSubCategoriesDTO';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { SubCategory as SubCategoryPrisma } from '../../../../../../prisma/generated/postgres';
import { ISubCategoriesRepository } from '../../../repositories/ISubCategoriesRepository';
import { SubCategory } from '../entities/SubCategory';

class SubCategoriesRepository implements ISubCategoriesRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data;
    return this.prismaRepository.subCategory.count({
      where: {
        name: {
          contains: query /* Optional filter */,
          mode: 'insensitive',
        },
      },
    });
  }

  public async allCategoriesPagination(
    data: IDataPageDTO,
  ): Promise<ITotalSubCategoriesDTO> {
    const { page, pageSize, query } = data;

    let subCategories = [] as SubCategoryPrisma[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      subCategories = await this.prismaRepository.subCategory.findMany({
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
      result: subCategories as unknown as SubCategory[],
      total,
    };
  }

  public async allSubCategories(): Promise<SubCategory[] | null> {
    const subCategories = await this.prismaRepository.subCategory.findMany({});
    return subCategories as unknown as SubCategory[];
  }

  public async findByName(name: string): Promise<SubCategory | null> {
    const subCategory = await this.prismaRepository.subCategory.findUnique({
      where: { name },
    });
    return subCategory as unknown as SubCategory;
  }

  public async findById(id: string): Promise<SubCategory | null> {
    const subCategory = await this.prismaRepository.subCategory.findUnique({
      where: { id },
    });
    return subCategory as unknown as SubCategory;
  }

  public async create(data: ICreateSubCategoryDTO): Promise<SubCategory> {
    return this.prismaRepository.subCategory.create({
      data,
    }) as unknown as SubCategory;
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<SubCategory> {
    const subCategory = await this.prismaRepository.subCategory.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return subCategory as unknown as SubCategory;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaRepository.subCategory.delete({
      where: {
        id,
      },
    });
  }
}

export { SubCategoriesRepository };
