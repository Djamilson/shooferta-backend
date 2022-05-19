import CreatePhoneService from '@modules/users/services/CreatePhoneService';
import AppError from '@shared/errors/AppError';
import { parse } from 'date-fns';
import { container, inject, injectable } from 'tsyringe';
import { Person } from '../infra/typeprisma/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import CreateAddressService from './CreateAddressService';

interface IRequest {
  user_id: string;
  cpf: string;
  birdthDate: string;
  rg: string;
  rgss: string;

  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  zip_code: string;
  city: string;
  state: string;

  phone: string;
}

@injectable()
class UpdatePersonAllDateService {
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

    number,
    street,
    complement,
    neighborhood,
    zip_code,
    city,
    state,

    phone,
  }: IRequest): Promise<Person> {
    const newBirthDate = parse(birdthDate, 'dd/MM/yyyy', new Date());

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const createPhone = container.resolve(CreatePhoneService);
    const createAddress = container.resolve(CreateAddressService);

    const newPhone = await createPhone.execute({
      phone,
      user_id,
    });

    const newAddres = await createAddress.execute({
      number: Number(number),
      street,
      complement,
      zip_code,
      neighborhood,
      user_id,
      city,
      state,
    });

    const newUser = await this.usersRepository.findById(user_id);

    if (!newUser) {
      throw new AppError('User not found');
    }

    const { id } = newUser.person;
    return this.personsRepository.update({
      id,
      updateData: {
        address_id: newAddres.id,
        phone_id: newPhone.id,
        cpf,
        rg,
        rgss,
        newBirthDate,
      },
    });
  }
}

export default UpdatePersonAllDateService;
