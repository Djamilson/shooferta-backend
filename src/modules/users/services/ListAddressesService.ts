import AppError from '@shared/errors/AppError';
import { instanceToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { compareValues } from '../../../shared/util/compareValues';
import { Address } from '../infra/typeprisma/entities/Address';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListAddressesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute(user_id: string): Promise<any> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('There not find any user with the givan id');
    }

    const personAddresses =
      await this.personsRepository.findAllAddressesToPerson(
        userExists.person.id,
      );

    const serializableAddresses = personAddresses?.addresses
      ?.map((address: Address) => {
        if (address.id === personAddresses.address_id) {
          return {
            ...instanceToPlain(address),
            main: true,
          };
        }
        return {
          ...instanceToPlain(address),
          main: false,
        };
      })
      .sort(compareValues('main', 'desc'));

    return serializableAddresses;
  }
}

export default ListAddressesService;
