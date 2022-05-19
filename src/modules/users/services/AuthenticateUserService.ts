import authConfig from '@config/auth';
import IRefreshesTokensRepository from '@modules/refreshesTokens/repositories/IRefreshesTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import { plainToInstance } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserGroupsDTO } from '../dtos/IUserGroupsDTO';
import { IUserSerializableDTO } from '../dtos/IUserSerealizableDTO';
import { Person } from '../infra/typeprisma/entities/Person';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IGroupsRepository from '../repositories/IGroupsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
  device: string;
}
interface IResponse {
  user: IUserSerializableDTO;
  token: string;
  refreshToken?: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshesTokensRepository')
    private refreshesTokensRepository: IRefreshesTokensRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  public async execute({
    email,
    password,
    device,
  }: IRequest): Promise<IResponse> {
    const userOut = await this.usersRepository.findByEmail(email);

    if (!userOut) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userOut.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 402);
    }

    const roles = userOut?.usersGroups.map((userGroup: IUserGroupsDTO) => {
      return userGroup.group.description;
    });

    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig.jwt;

    const token = sign({ roles }, secretToken, {
      subject: userOut.id,
      expiresIn: expiresInToken,
    });

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: userOut.id,
      expiresIn: expiresInRefreshToken,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expiresRefreshTokenDays,
    );

    const listRefreshTokensUser =
      await this.refreshesTokensRepository.findRefresheTokenToUserIdInDevice({
        user_id: userOut.id,
        device,
      });

    if (listRefreshTokensUser && listRefreshTokensUser.length > 0) {
      const serealizable = listRefreshTokensUser.map(
        refreshToken => refreshToken.id,
      );
      await this.refreshesTokensRepository.deleteListIds(serealizable);
    }

    await this.refreshesTokensRepository.create({
      user_id: userOut.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
      device,
    });

    const user = {
      id: userOut.id,
      is_verified: userOut.is_verified,
      roles,
      firstName: userOut.person.name.split(' ')[0],
      person: plainToInstance(Person, userOut.person),
    };

    return {
      user,
      token,
      refreshToken: refresh_token,
    };
  }
}

export default AuthenticateUserService;
