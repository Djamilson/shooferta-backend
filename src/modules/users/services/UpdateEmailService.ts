import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  email: string;
}

@injectable()
class UpdateEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, email }: IRequest): Promise<any> {
    try {

      console.log('user::: ii', user_id, email);
      const user = await this.usersRepository.findById(user_id);

      console.log('user:::',
        JSON.stringify(user, null, 2));

      if (!user) {
        throw new AppError('User not found');
      }

      const personWithUpdatedEmail = await this.personsRepository.findByEmail(
        email,
      );


      console.log(
        'personWithUpdatedEmail:::',
        JSON.stringify(personWithUpdatedEmail, null, 2)
      );

      if (personWithUpdatedEmail && personWithUpdatedEmail.id !== user_id) {
        throw new AppError('E-mail already in use.', 401);
      }

      return this.personsRepository.update({
        id: user.person.id,
        updateData: { email },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateEmailService };
