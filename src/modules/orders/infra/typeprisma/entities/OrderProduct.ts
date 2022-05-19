import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import User from '@modules/users/infra/typeprisma/entities/User';
import {
  Price,
  StatusOrderEnum,
} from '@shared/infra/prisma/postgres/generated/postgres';
import { Order } from './Order';

class OrderProduct {
  id: string;
  order: Order;
  product: Product;
  status: StatusOrderEnum;
  product_id: string;
  subtotal: number;
  order_id: string;
  price: Price;
  price_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  user: User;
  user_id: string;
  price_payment?: number;
  bank?: string;
  verification_code?: string;
  canceled_at: Date;
}

export { OrderProduct };
