import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Person } from '../infra/typeprisma/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateNameEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<Person> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    const { id } = user.person;

    return this.personsRepository.update({
      id,
      updateData: {
        name,
        email,
      },
    });
  }
}

export { UpdateNameEmailService };
