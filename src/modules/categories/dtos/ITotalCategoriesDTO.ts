import { Category } from '../infra/typeprisma/entities/Category';

export default interface ITotalCategoriesDTO {
  result: Category[];
  total: number;
}
