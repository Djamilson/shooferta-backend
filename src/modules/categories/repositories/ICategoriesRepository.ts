import { CategoryProduct } from '@modules/products/infra/typeprisma/entities/CategoryProduct';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { TypeCategoryEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { ICategoryPageDTO } from '../dtos/ICategoryPageDTO';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import ITotalCategoriesDTO from '../dtos/ITotalCategoriesDTO';
import ITotalCategoryIdByProductsDTO from '../dtos/ITotalCategoryIdByProductsDTO';
import { Category } from '../infra/typeprisma/entities/Category';


interface ICategoriesRepository {
  allCategoryProductPagination(
    data: ICategoryPageDTO,
  ): Promise<ITotalCategoryIdByProductsDTO>;

  allCategoriesPagination(data: IDataPageDTO): Promise<ITotalCategoriesDTO>;

  findByName(name: string): Promise<Category | null>;
  allByTypeCategories(type: TypeCategoryEnum): Promise<Category[]>;
  allCategories(): Promise<Category[] | null>;

  findById(id: string): Promise<Category | null>;

  create(data: ICreateCategoryDTO): Promise<Category>;
  update({ id, updateData }: IPropsUpdateData): Promise<Category>;
  delete(id: string): Promise<Category>;
}

export { ICategoriesRepository };
