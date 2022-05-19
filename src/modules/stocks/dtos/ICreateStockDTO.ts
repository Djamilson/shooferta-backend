import { StockActionEnum, StocksStatusEnum } from "@shared/infra/prisma/postgres/generated/postgres";

interface ICreateStockDTO {
  stock: number;
  status: StocksStatusEnum;
  product_id: string;
  action: StockActionEnum;
}

export { ICreateStockDTO };
