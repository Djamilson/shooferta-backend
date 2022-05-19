import { ICreateForgotTokenDTO } from '@modules/users/dtos/ICreateDTO';
import IForgotTokensRepository from '@modules/users/repositories/IForgotTokensRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { ForgotToken } from '../entities/ForgotToken';

class ForgotTokensRepository implements IForgotTokensRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByToken(token: string): Promise<ForgotToken | null> {
    return this.prismaRepository.forgotToken.findFirst({
      where: { token },
    });
  }

  public async findByCode(code: string): Promise<ForgotToken | null> {
    return this.prismaRepository.forgotToken.findFirst({
      where: { code },
    });
  }

  public async findByUserId(user_id: string): Promise<ForgotToken[] | null> {
    return this.prismaRepository.forgotToken.findMany({
      where: { user_id },
    });
  }

  public async findById(id: string): Promise<ForgotToken | null> {
    return this.prismaRepository.forgotToken.findUnique({
      where: { id },
    });
  }

  public async create(data: ICreateForgotTokenDTO): Promise<ForgotToken> {
    return this.prismaRepository.forgotToken.create({
      data,
    });
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<ForgotToken> {
    const forgotToken = await this.prismaRepository.forgotToken.update({
      where: {
        id,
      },
      data: updateData,
    });
    return forgotToken;
  }

  public async delete(id: string): Promise<any> {
    const forgotToken = await this.prismaRepository.forgotToken.delete({
      where: {
        id,
      },
    });
    return forgotToken;
  }

  public async deleteListIds(ids: string[]): Promise<void> {
    await this.prismaRepository.forgotToken.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

export default ForgotTokensRepository;
