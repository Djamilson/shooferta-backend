import { IPropsUpdateData } from '@modules/__DTOS';
import {
    Prisma,
    RefresheToken
} from '@prisma/client';
import IByUserIdAndRefreshTokenDTO from '../dtos/IByUserIdAndRefreshTokenDTO';

export default interface IRefreshesTokensRepository {
  findByUserId(user_id: string): Promise<RefresheToken[] | null>;

  findByUserIdAndRefresheToken({
    user_id,
    refresh_token,
  }: IByUserIdAndRefreshTokenDTO): Promise<RefresheToken | null>;

  findRefresheTokenToUserIdInDevice({
    device,
    user_id,
  }: {
    device: string;
    user_id: string;
  }): Promise<RefresheToken[] | null>;

  findById(id: string): Promise<RefresheToken | null>;
  create(
    data: Prisma.RefresheTokenUncheckedCreateInput,
  ): Promise<RefresheToken>;
  update({ id, updateData }: IPropsUpdateData): Promise<RefresheToken>;
  delete(id: string): Promise<RefresheToken>;
  deleteListIds(ids: string[]): Promise<void>;
}
