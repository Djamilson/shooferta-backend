import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import AppErrorAuth from '@shared/errors/AppErrorAuth';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IForgotTokensRepository from '../repositories/IForgotTokensRepository';

interface IRequest {
  code: string;
}

interface IObject {
  token: string;
}

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@injectable()
class ValidationCodeService {
  constructor(
    @inject('ForgotTokensRepository')
    private forgotTokensRepository: IForgotTokensRepository,
  ) {}

  public async execute({ code }: IRequest): Promise<IObject> {
    try {
      const userToken = await this.forgotTokensRepository.findByCode(code);

      if (!userToken) {
        throw new AppError('User token does not exists', 401);
      }

      verify(userToken.token, authConfig.jwt.secretForgotToken);

      return { token: userToken.token };
    } catch (err: any) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new AppError('token.invalid!', 401);
        }
      }
      throw new AppErrorAuth('Token invalid.', 'token.invalid', 401);
    }
  }
}

export default ValidationCodeService;
