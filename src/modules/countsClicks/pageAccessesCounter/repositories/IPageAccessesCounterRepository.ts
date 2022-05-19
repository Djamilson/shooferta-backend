import { IPropsUpdateData } from '@modules/__DTOS';
import ICreatePageAccessesCounterDTO from '../dtos/ICreatePageAccessesCounterDTO';
import { PageAccessCounter } from '../infra/typeprisma/schemas/PageAccessCounter';

export default interface IPageAccessesCounterRepository {
  findTotalPageAccessCounter(): Promise<number>;
  create(data: ICreatePageAccessesCounterDTO): Promise<PageAccessCounter | any>;
  update({ id, updateData }: IPropsUpdateData): Promise<PageAccessCounter>;
}
