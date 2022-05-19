import authConfig from '@config/auth';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IRefreshesTokensRepository from '@modules/refreshesTokens/repositories/IRefreshesTokensRepository';
import { IUserGroupsDTO } from '@modules/users/dtos/IUserGroupsDTO';
import { Person } from '@modules/users/infra/typeprisma/entities/Person';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import { plainToInstance } from 'class-transformer';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayload {
  sub: string;
  email: string;
}

interface IUserSerializable {
  id?: string;
  is_verified?: boolean;
  roles?: string[];
  firstName?: string;
  person: {
    phone_id?: string;
    address_id?: string;
    id?: string;
    name?: string;
    email?: string;
    status?: boolean;
    privacy?: boolean;
    avatar?: string;
    avatar_url?: () => string | null;
  };
}

interface ITokenResponse {
  user: IUserSerializable;
  token: string;
  refreshToken: string;
}

interface IRequest {
  token: string;
  device: string;
}
@injectable()
class CreateRefreshTokenService {
  constructor(
    @inject('RefreshesTokensRepository')
    private refreshesTokensRepository: IRefreshesTokensRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,


  ) {}

  public async execute({ token, device }: IRequest): Promise<ITokenResponse> {
    const {
      secretToken,
      expiresInToken,
      expiresInRefreshToken,
      secretRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig.jwt;

    const { email, sub } = verify(token, secretRefreshToken) as IPayload;

    const user_id = sub;

    const userToken =
      await this.refreshesTokensRepository.findByUserIdAndRefresheToken({
        user_id,
        refresh_token: token,
      });

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    const listRefreshTokensUser =
      await this.refreshesTokensRepository.findRefresheTokenToUserIdInDevice({
        user_id,
        device,
      });

    if (listRefreshTokensUser && listRefreshTokensUser.length > 0) {
      const seralizable = listRefreshTokensUser.map(
        refreshToken => refreshToken.id,
      );
      await this.refreshesTokensRepository.deleteListIds(seralizable);
    }

    const userOut = await this.usersRepository.findByEmail(email);

    const roles = userOut?.usersGroups.map((userGroup: IUserGroupsDTO) => {
      return userGroup.group.description;
    });

    const newToken = sign({ roles }, secretToken, {
      subject: user_id,
      expiresIn: expiresInToken,
    });

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: user_id,
      expiresIn: expiresInRefreshToken,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expiresRefreshTokenDays,
    );

    await this.refreshesTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
      device,
    });

    const user = {
      id: user_id,
      is_verified: userOut?.is_verified,
      roles,
      firstName: userOut?.person.name.split(' ')[0],
      person: plainToInstance(Person, userOut.person),
    };

    return { user, refreshToken: refresh_token, token: newToken };
  }
}

export default CreateRefreshTokenService;
