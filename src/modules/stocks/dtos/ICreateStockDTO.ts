import {
  StockActionEnum,
  StocksStatusEnum,
} from '../../../../prisma/generated/postgres';

interface ICreateStockDTO {
  stock: number;
  status: StocksStatusEnum;
  product_id: string;
  action: StockActionEnum;
}

export { ICreateStockDTO };
