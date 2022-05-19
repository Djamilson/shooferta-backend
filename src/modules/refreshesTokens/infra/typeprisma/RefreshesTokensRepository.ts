import IByUserIdAndRefreshTokenDTO from '@modules/refreshesTokens/dtos/IByUserIdAndRefreshTokenDTO';
import ICreateRefreshTokenDTO from '@modules/refreshesTokens/dtos/ICreateRefreshTokenDTO';
import IRefreshesTokensRepository from '@modules/refreshesTokens/repositories/IRefreshesTokensRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { RefresheToken } from '@shared/infra/prisma/postgres/generated/postgres';

class RefreshesTokensRepository implements IRefreshesTokensRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByUserIdAndRefresheToken({
    user_id,
    refresh_token,
  }: IByUserIdAndRefreshTokenDTO): Promise<RefresheToken | null> {
    return this.prismaRepository.refresheToken.findFirst({
      where: { user_id, refresh_token },
    });
  }

  public async findRefresheTokenToUserIdInDevice({
    device,
    user_id,
  }: {
    device: string;
    user_id: string;
  }): Promise<RefresheToken[] | null> {
    return this.prismaRepository.refresheToken.findMany({
      where: { device, user_id },
    });
  }

  public async findByUserId(user_id: string): Promise<RefresheToken[] | null> {
    return this.prismaRepository.refresheToken.findMany({
      where: { user_id },
    });
  }

  public async findById(id: string): Promise<RefresheToken | null> {
    return this.prismaRepository.refresheToken.findUnique({
      where: { id },
    });
  }

  public async create(data: ICreateRefreshTokenDTO): Promise<RefresheToken> {
    return this.prismaRepository.refresheToken.create({
      data,
    });
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<RefresheToken> {
    const refresheToken = await this.prismaRepository.refresheToken.update({
      where: {
        id,
      },
      data: updateData,
    });
    return refresheToken;
  }

  public async delete(id: string): Promise<RefresheToken> {
    return this.prismaRepository.refresheToken.delete({
      where: {
        id,
      },
    });
  }

  public async deleteListIds(ids: string[]): Promise<void> {
    await this.prismaRepository.refresheToken.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

export default RefreshesTokensRepository;
