import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreateForgotTokenDTO } from '../dtos/ICreateDTO';
import { ForgotToken } from '../infra/typeprisma/entities/ForgotToken';

export default interface IForgotTokensRepository {
  findByToken(token: string): Promise<ForgotToken | null>;
  findByCode(code: string): Promise<ForgotToken | null>;
  findByUserId(user_id: string): Promise<ForgotToken[] | null>;
  deleteListIds(ids: string[]): Promise<void>;

  create(data: ICreateForgotTokenDTO): Promise<ForgotToken>;
  update({ id, updateData }: IPropsUpdateData): Promise<ForgotToken>;
  delete(id: string): Promise<void>;
}
