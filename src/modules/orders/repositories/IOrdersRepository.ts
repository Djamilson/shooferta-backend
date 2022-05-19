import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { ITotalOrdersDTO } from '../dtos/ITotalOrdersDTO';
import { Order } from '../infra/typeprisma/entities/Order';

export default interface IOrdersRepository {
  allOrderPagination(object: IDataPageDTO): Promise<ITotalOrdersDTO>;

  findById(id: string): Promise<Order | null>;
  findAllOrdersToUserId(user_id: string): Promise<Order[] | null>;
  create(data: ICreateOrderDTO): Promise<Order>;
  update({ id, updateData }: IPropsUpdateData): Promise<Order>;
}
