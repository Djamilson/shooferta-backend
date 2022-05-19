import { Price } from '../infra/typeprisma/entities/Price';

export default interface IPaginatedPricesDTO {
  data: Price[];
  page: number;
  limit: number;
  totalCount: number;
}
