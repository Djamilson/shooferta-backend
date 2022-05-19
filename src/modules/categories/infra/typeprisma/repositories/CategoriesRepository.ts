import { ICategoryPageDTO } from '@modules/categories/dtos/ICategoryPageDTO';
import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import ITotalCategoriesDTO from '@modules/categories/dtos/ITotalCategoriesDTO';
import ITotalCategoryIdByProductsDTO from '@modules/categories/dtos/ITotalCategoryIdByProductsDTO';
import { CategoryProduct } from '@modules/products/infra/typeprisma/entities/CategoryProduct';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import AppError from '@shared/errors/AppError';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { TypeCategoryEnum } from '../../../../../../prisma/generated/postgres';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }
  public async allByTypeCategories(
    type: TypeCategoryEnum,
  ): Promise<Category[]> {
    const categories = await this.prismaRepository.category.findMany({
      where: { type },
    });
    return categories as unknown as Category[];
  }

  public async findAllByIds(ids: string[]): Promise<Category[]> {
    const categories = await this.prismaRepository.category.findMany({
      where: { id: { in: ids } },
    });
    return categories as unknown as Category[];
  }

  public async totalRegisterCategoriesProducts(
    data: ICategoryPageDTO,
  ): Promise<number> {
    const { query, status, category_id } = data;
    return this.prismaRepository.categoryProduct.count({
      where: {
        category_id,
        product: {
          status,
          description: {
            description: { contains: query, mode: 'insensitive' },
          },
        },
      },
    });
  }

  public async totalRegisterCategories(data: IDataPageDTO): Promise<number> {
    const { query } = data;
    return this.prismaRepository.category.count({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        NOT: {
          name: {
            contains: 'Slides',
          },
        },
      },
    });
  }

  public async allCategoriesPagination(
    data: IDataPageDTO,
  ): Promise<ITotalCategoriesDTO | any> {
    try {
      const { page, pageSize, query } = data;
      console.log('==> estou pronto:', page, pageSize, query);

      let categories = [] as Category[];

      const total = await this.totalRegisterCategories(data);

      if (total > 0) {
        categories = (await this.prismaRepository.category.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
            NOT: {
              name: {
                contains: 'Slides',
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        })) as unknown as Category[];

        console.log('==> categories', categories);
      }

      return {
        result: categories,
        total,
      };
    } catch (e) {
      console.log('eroor:', e);
    }
  }

  public async allCategoryProductPagination(
    data: ICategoryPageDTO,
  ): Promise<ITotalCategoryIdByProductsDTO> {
    const { category_id, page, pageSize, query, status } = data;

    let categoryProducts = [] as CategoryProduct[];

    const total = await this.totalRegisterCategoriesProducts(data);

    if (total > 0) {
      categoryProducts = (await this.prismaRepository.categoryProduct.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          category_id,
          product: {
            status,
            description: {
              description: { contains: query, mode: 'insensitive' },
            },
          },
        },
        orderBy: {
          product: {
            subcategory: {
              name: 'asc',
            },
          },
        },
      })) as unknown as CategoryProduct[];
    }

    return {
      result: categoryProducts,
      total,
    };
  }

  public async allCategories(): Promise<Category[] | null> {
    const categories = await this.prismaRepository.category.findMany({});
    return categories as unknown as Category[];
  }

  public async findById(id: string): Promise<Category | null> {
    const category = await this.prismaRepository.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        slug: true,
        description: true,
        photo: true,
      },
    });
    return category as unknown as Category;
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = await this.prismaRepository.category.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    return category as unknown as Category;
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    try {
      const category = await this.prismaRepository.category.create({
        data,
      });

      return category as unknown as Category;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Category> {
    console.log('updateData:', updateData);
    const category = await this.prismaRepository.category.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return category as unknown as Category;
  }

  public async delete(id: string): Promise<Category> {
    const category = await this.prismaRepository.category.delete({
      where: {
        id,
      },
    });
    return category as unknown as Category;
  }
}

export { CategoriesRepository };
