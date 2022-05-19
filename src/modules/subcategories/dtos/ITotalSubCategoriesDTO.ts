import { SubCategory } from '../infra/typeorm/entities/SubCategory';

export default interface ITotalSubCategoriesDTO {
  result: SubCategory[];
  total: number;
}
