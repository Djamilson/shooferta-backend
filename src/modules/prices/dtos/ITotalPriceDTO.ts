import { Price } from '../infra/typeprisma/entities/Price';

export default interface ITotalPriceDTO {
  result: Price[];
  total: number;
}
