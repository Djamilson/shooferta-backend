import AppError from '@shared/errors/AppError';
import { parse } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { Person } from '../infra/typeprisma/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  cpf: string;
  birdthDate: string;
  rg: string;
  rgss: string;
  address_id: string;
  phone_id: string;
}

@injectable()
class UpdatePersonService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    user_id,
    cpf,
    birdthDate,
    rg,
    rgss,
    address_id,
    phone_id,
  }: IRequest): Promise<Person> {
    const newBirthDate = parse(birdthDate, 'dd/MM/yyyy', new Date());

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const { id } = user.person;

    return this.personsRepository.update({
      id,
      updateData: {
        cpf,
        rg,
        rgss,
        birth_date: newBirthDate,
        address_id,
        phone_id,
      },
    });
  }
}

export default UpdatePersonService;
