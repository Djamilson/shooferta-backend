import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreateStockDTO } from '../dtos/ICreateStockDTO';
import { Stock } from '../infra/typeprisma/entities/Stock';

interface IStocksRepository {
  findProductTotal(product_id: string): Promise<number | null>;

  allStock(): Promise<Stock[] | null>;
  findById(id: string): Promise<Stock | null>;
  create(data: ICreateStockDTO): Promise<Stock>;
  createList(data: ICreateStockDTO[]): Promise<void>;
  update({ id, updateData }: IPropsUpdateData): Promise<Stock>;
}

export { IStocksRepository };
