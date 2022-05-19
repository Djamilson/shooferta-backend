import { ProductInfo } from '../infra/typeprisma/entities/ProductInfo';

export default interface IPaginatedProductInfoDTO {
  data: ProductInfo[];
  page: number;
  limit: number;
  totalCount: number;
}
