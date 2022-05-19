import { ICreateAddressDTO } from '@modules/users/dtos/ICreateDTO';
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Address } from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByAddress(data: ICreateAddressDTO): Promise<Address | null> {
    return this.prismaRepository.addressPerson.findFirst({
      where: data,
    });
  }

  public async findById(id: string): Promise<Address | null> {
    return this.prismaRepository.addressPerson.findUnique({
      where: { id },
      select: {
        id: true,
        city: true,
        number: true,
        complement: true,
        neighborhood: true,
        person_id: true,
        state: true,
        street: true,
        zip_code: true,
      },
    }) as unknown as Address;
  }
  public async create(data: ICreateAddressDTO): Promise<Address> {
    return this.prismaRepository.addressPerson.create({
      data,
    });
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Address> {
    const addressPerson = await this.prismaRepository.addressPerson.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return addressPerson;
  }

  public async delete(id: string): Promise<Address> {
    const addressPerson = await this.prismaRepository.addressPerson.delete({
      where: {
        id,
      },
    });
    return addressPerson;
  }
}

export default AddressesRepository;
