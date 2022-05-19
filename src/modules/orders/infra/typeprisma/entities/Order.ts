import User from '@modules/users/infra/typeprisma/entities/User';
import { StatusOrderEnum } from '../../../../../../prisma/generated/postgres';
import { OrderProduct } from './OrderProduct';

class Order {
  id: string;

  user: User;
  user_id: string;
  status: StatusOrderEnum;
  order_products: OrderProduct[];
  total: number;
  freight: number;
  canceled_at: Date;
  created_at: Date;
  updated_at: Date;
}

export { Order };
