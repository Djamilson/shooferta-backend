import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeprisma/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
  id: string;
  number: number;
  street: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  person_id: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    id: oldId,
    number,
    street,
    complement,
    zip_code,
    neighborhood,
    city,
    state,
    person_id,
  }: IRequest): Promise<Address | undefined> {
    const checkAddressExists = await this.addressesRepository.findById(oldId);

    if (!checkAddressExists) {
      throw new AppError('Address not exist.');
    }

    checkAddressExists.number = number;
    checkAddressExists.street = street;
    checkAddressExists.complement = complement;
    checkAddressExists.zip_code = zip_code;
    checkAddressExists.neighborhood = neighborhood;
    checkAddressExists.city = city;
    checkAddressExists.state = state;
    checkAddressExists.person_id = person_id;

    const { id, ...rest } = checkAddressExists;

    await this.addressesRepository.update({ id, updateData: { ...rest } });

    return checkAddressExists;
  }
}

export default UpdateAddressService;
