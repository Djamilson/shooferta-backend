import { ICreateCategoryProductDTO } from '@modules/products/dtos/ICreateDTO';
import {
  ICategoriesProductsRepository,
  ICategoryIdProductId,
  IUpdateCategory,
} from '@modules/products/repositories/ICategoriesProductsRepository';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { CategoryProduct } from '../entities/CategoryProduct';

class CategoriesProductsRepository implements ICategoriesProductsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByCategoriesProductsToProductId(
    id: string,
  ): Promise<CategoryProduct[]> {
    const list = await this.prismaRepository.categoryProduct.findMany({
      where: {
        product_id: id,
      },
      include: {
        category: true,
        product: {
          select: {
            bar_code: true,
            description: true,
            other: true,
            price: true,
          },

          include: {
            subcategory: true,
          },
        },
      },
    });
    return list as unknown as CategoryProduct[];
  }

  public async findByCategoryIdInProductId({
    category_id,
    product_id,
  }: ICategoryIdProductId): Promise<CategoryProduct | null> {
    const categoryProduct =
      await this.prismaRepository.categoryProduct.findFirst({
        where: {
          category_id,
          product_id,
        },
        select: {
          category_id: true,
          product_id: true,
        },
      });
    return categoryProduct as unknown as CategoryProduct;
  }

  public async findById(
    data: ICategoryIdProductId,
  ): Promise<CategoryProduct | null> {
    const categoryProduct =
      await this.prismaRepository.categoryProduct.findUnique({
        where: { category_id_product_id: data },
      });
    return categoryProduct as unknown as CategoryProduct;
  }

  public async create(
    data: ICreateCategoryProductDTO,
  ): Promise<CategoryProduct> {
    return this.prismaRepository.categoryProduct.create({
      data,
    }) as unknown as CategoryProduct;
  }

  public async update({
    data,
    updateData,
  }: IUpdateCategory): Promise<CategoryProduct> {
    const categoryProduct = await this.prismaRepository.categoryProduct.update({
      where: { category_id_product_id: data },
      data: updateData,
    });
    return categoryProduct as unknown as CategoryProduct;
  }

  public async delete(data: ICategoryIdProductId): Promise<void> {
    await this.prismaRepository.categoryProduct.delete({
      where: {
        category_id_product_id: data,
      },
    });
  }
}

export { CategoriesProductsRepository };
