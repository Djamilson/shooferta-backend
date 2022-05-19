import AppError from '@shared/errors/AppError';
import { parse } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { Person } from '../infra/typeprisma/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  cpf: string;
  birth_date: string;
}

@injectable()
class UpdateProfileDataService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    user_id,
    cpf,
    birth_date,
    name,
  }: IRequest): Promise<Person> {
    const newBirthDate = parse(birth_date, 'dd/MM/yyyy', new Date());

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return this.personsRepository.update({
      id: user.person_id,
      updateData: {
        name,
        cpf,
        birth_date: newBirthDate,
      },
    });
  }
}

export { UpdateProfileDataService };
