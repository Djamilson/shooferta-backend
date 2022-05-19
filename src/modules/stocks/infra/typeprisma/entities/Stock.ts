import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import {
  StockActionEnum,
  StocksStatusEnum,
} from '@shared/infra/prisma/postgres/generated/postgres';
import { Exclude } from 'class-transformer';

class Stock {
  id: string;
  stock: number;
  product_id: string;
  product: Product;
  status: StocksStatusEnum;
  action: StockActionEnum;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { Stock };
