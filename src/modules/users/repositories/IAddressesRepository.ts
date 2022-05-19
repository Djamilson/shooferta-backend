import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreateAddressDTO } from '../dtos/ICreateDTO';
import { Address } from '../infra/typeprisma/entities/Address';

export default interface IAddressesRepository {
  findByAddress(data: ICreateAddressDTO): Promise<Address | null>;

  findById(id: string): Promise<Address | null>;
  create(data: ICreateAddressDTO): Promise<Address>;
  update({ id, updateData }: IPropsUpdateData): Promise<Address>;
  delete(id: string): Promise<Address>;
}
