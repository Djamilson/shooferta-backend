import { ProductInfo } from '../infra/typeprisma/entities/ProductInfo';

export default interface ITotalProductInfoDTO {
  result: ProductInfo[];
  total: number;
}
