import { IPropsUpdateData } from '@modules/__DTOS';
import { OrderProduct } from '../infra/typeprisma/entities/OrderProduct';

export default interface IOrdersProductsRepository {
  allOrdersProductsByOrderIdAndAWAITINGByPROCESSING(
    orderId: string,
  ): Promise<OrderProduct[]>;

  allOrdersProductsByOrderId(orderId: string): Promise<OrderProduct[] | null>;
  findById(id: string): Promise<OrderProduct | null>;
  update({ id, updateData }: IPropsUpdateData): Promise<OrderProduct>;
}
