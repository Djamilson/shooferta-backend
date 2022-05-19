import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  avatar: string;
}

interface IUser {
  user_id: string;
  person_id: string;
  person_name: string;
  person_email: string;
  person_status: boolean;
  person_privacy: boolean;
  person_avatar: string;
  person_avatar_url: string | null;
}
@injectable()
class SyncPullUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, name, avatar }: IRequest): Promise<IUser> {
    let user = await this.usersRepository.findById(user_id);
    let test = false;

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.person.name !== name) {
      user.person.name = name;
      test = true;
    }

    if (test) {
      const { id, ...rest } = user.person;
      await this.personsRepository.update({ id, updateData: { ...rest } });
      user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }
    }

    return {
      user_id: user.id,
      person_id: user.person.id,
      person_name: user.person.name,
      person_email: user.person.email,
      person_status: user.person.status,
      person_privacy: user.person.privacy,
      person_avatar: user.person.avatar,
      person_avatar_url: user.person.getAvatarUrl(),
    };
  }
}

export { SyncPullUsersService };
