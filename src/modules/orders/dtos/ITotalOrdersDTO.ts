import { Order } from '../infra/typeprisma/entities/Order';

export type ITotalOrdersDTO = {
  result: Order[];
  total: number;
};
