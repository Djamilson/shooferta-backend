import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { Exclude } from 'class-transformer';
import {
  StockActionEnum,
  StocksStatusEnum,
} from '../../../../../../prisma/generated/postgres';

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
