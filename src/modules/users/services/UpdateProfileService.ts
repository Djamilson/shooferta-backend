import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.personsRepository.update({
      id: user.id,
      updateData: {
        email,
        name,
      },
    });

    return this.usersRepository.update({
      id: user.id,
      updateData: { password: user.password },
    });
  }
}

export default UpdateProfileService;
