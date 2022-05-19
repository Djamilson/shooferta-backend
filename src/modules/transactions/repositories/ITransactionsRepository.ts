import { IPropsUpdateData } from '@modules/__DTOS';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import { Transaction } from '../infra/typeprisma/entities/Transaction';

export default interface ITransactionsRepository {
  findByOrderId(order_id: string): Promise<Transaction | null>;
  findById(id: string): Promise<Transaction | null>;

  create(data: ICreateTransactionDTO): Promise<Transaction>;
  update({ id, updateData }: IPropsUpdateData): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
