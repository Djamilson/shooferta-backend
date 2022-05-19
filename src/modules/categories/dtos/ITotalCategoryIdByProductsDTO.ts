import { CategoryProduct } from '@modules/products/infra/typeprisma/entities/CategoryProduct';

export default interface ITotalCategoryIdByProductsDTO {
  result: CategoryProduct[];
  total: number;
}
