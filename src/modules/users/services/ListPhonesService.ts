import AppError from '@shared/errors/AppError';
import { compareValues } from '@shared/util/compareValues';
import { instanceToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Phone } from '../infra/typeprisma/entities/Phone';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}
interface IPhone {
  id: string;
  phone: string;
  person_id: string;
  main: boolean;
}
@injectable()
class ListPhonesService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<any> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not found.');
    }
    const { person_id } = checkUserExists;

    const personPhones = await this.personsRepository.findAllPhonesToPersonId(
      person_id,
    );

    const serializablePhones = personPhones?.phones
      ?.map((phone: Phone) => {
        if (phone.id === personPhones.phone_id) {
          return {
            ...instanceToPlain(phone),
            main: true,
          };
        }
        return {
          ...instanceToPlain(phone),
          main: false,
        };
      })
      .sort(compareValues('main', 'desc'));

    return serializablePhones;
  }
}

export default ListPhonesService;
