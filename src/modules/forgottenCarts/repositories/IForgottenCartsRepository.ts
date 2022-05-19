import { IPropsUpdateData } from '@modules/__DTOS';
import { ObjectId } from 'bson';
import ICreateForgottenCartDTO from '../dtos/ICreateForgottenCartDTO';
import { ForgottenCart } from '../infra/typeprisma/schemas/ForgottenCart';

export type IUserIdByProductId = {
  user_id: string;
  product_id: string;
};

export default interface IForgottenCartsRepository {
  findByUserIdByProductId(
    data: IUserIdByProductId,
  ): Promise<ForgottenCart | null>;

  allForgottenCarts(user_id: string): Promise<ForgottenCart[] | null>;
  findById(id: string): Promise<ForgottenCart | null>;
  create(data: ICreateForgottenCartDTO): Promise<ForgottenCart>;
  update({ id, updateData }: IPropsUpdateData): Promise<ForgottenCart>;
  delete(id: ObjectId): Promise<ForgottenCart>;
  deleteAll(ids: string[]): Promise<void>;
}
