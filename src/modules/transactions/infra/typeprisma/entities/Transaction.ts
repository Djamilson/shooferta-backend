import { Order } from '@modules/orders/infra/typeprisma/entities/Order';

class Transaction {
  id: string;

  transaction_id: string;
  order: Order;
  order_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  authorized_amount: number;
  tid: string;
  installments: string;
  created_at: Date;
  updated_at: Date;
}

export { Transaction };
