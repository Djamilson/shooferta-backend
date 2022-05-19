import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { ICreateSubCategoryDTO } from '../dtos/ICreateSubCategoryDTO';
import ITotalSubCategoriesDTO from '../dtos/ITotalSubCategoriesDTO';
import { SubCategory } from '../infra/typeprisma/entities/SubCategory';

interface ISubCategoriesRepository {
  allCategoriesPagination(data: IDataPageDTO): Promise<ITotalSubCategoriesDTO>;

  findByName(name: string): Promise<SubCategory | null>;
  allSubCategories(): Promise<SubCategory[] | null>;
  findById(id: string): Promise<SubCategory | null>;
  create(data: ICreateSubCategoryDTO): Promise<SubCategory>;
  update({ id, updateData }: IPropsUpdateData): Promise<SubCategory>;
  delete(id: string): Promise<void>;
}

export { ISubCategoriesRepository };
