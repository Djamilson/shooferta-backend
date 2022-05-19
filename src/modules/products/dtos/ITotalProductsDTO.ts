import { Product } from '../infra/typeprisma/entities/Product';

export default interface ITotalProductsDTO {
  result: Product[];
  total: number;
}
