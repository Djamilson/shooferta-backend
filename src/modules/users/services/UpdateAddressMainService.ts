import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeprisma/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  addressId: string;
  user_id: string;
}

@injectable()
class UpdateAddressMainService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    addressId,
    user_id,
  }: IRequest): Promise<Address | null> {
    const checkAddressExists = await this.addressesRepository.findById(
      addressId,
    );

    if (!checkAddressExists) {
      throw new AppError('Address not exist.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    console.log('=>>>>', JSON.stringify(user, null, 2));

    await this.personsRepository.update({
      id: user.person.id,
      updateData: { address_id: addressId },
    });

    return checkAddressExists;
  }
}

export default UpdateAddressMainService;
