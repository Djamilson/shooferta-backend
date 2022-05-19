// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeprisma/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

type IRequest = {
  number: number;
  street: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  user_id: string;
  city: string;
  state: string;
};

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    number,
    street,
    complement,
    zip_code,
    neighborhood,
    user_id,
    city,
    state,
  }: IRequest): Promise<Address> {
    try {
     
      const checkUserExists = await this.usersRepository.findById(user_id);
      if (!checkUserExists) {
        throw new AppError('User not exist.');
      }

      const addressSerealizable = {
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        person_id: checkUserExists.person.id,
        city,
        state,
      };

      const address = await this.addressesRepository.create(
        addressSerealizable,
      );

      await this.personsRepository.update({
        id: checkUserExists.person.id,
        updateData: { address_id: address.id },
      });

      return address;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default CreateAddressService;
