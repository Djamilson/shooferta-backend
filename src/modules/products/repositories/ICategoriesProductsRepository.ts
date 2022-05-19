import { Category } from '@modules/categories/infra/typeprisma/entities/Category';
import { ICreateCategoryProductDTO } from '../dtos/ICreateDTO';
import { CategoryProduct } from '../infra/typeprisma/entities/CategoryProduct';
import { Product } from '../infra/typeprisma/entities/Product';

type ICreateCategoryProduct = {
  category: Category;
  product: Product;
};

export type ICategoryIdProductId = {
  category_id: string;
  product_id: string;
};

export type IUpdateCategory = {
  data: {
    category_id: string;
    product_id: string;
  };
  updateData: any;
};

export type ICreateProps = ICreateCategoryProduct[];
interface ICategoriesProductsRepository {
  findByCategoriesProductsToProductId(id: string): Promise<CategoryProduct[]>;
  findByCategoryIdInProductId(
    data: ICategoryIdProductId,
  ): Promise<CategoryProduct | null>;

  findById(
    categoryIdProductId: ICategoryIdProductId,
  ): Promise<CategoryProduct | null>;
  create(data: ICreateCategoryProductDTO): Promise<CategoryProduct>;
  update({ data, updateData }: IUpdateCategory): Promise<CategoryProduct>;
  delete(categoryIdProductId: ICategoryIdProductId): Promise<void>;
}

export { ICategoriesProductsRepository };
