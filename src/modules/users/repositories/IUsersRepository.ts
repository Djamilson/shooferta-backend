import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import {
  ICreatePersonAndPhoneAndAddressDTO,
  ICreateUserDTO,
} from '../dtos/ICreateDTO';
import { ITotalUsersDTO } from '../dtos/ITotalUsersDTO';
import User from '../infra/typeprisma/entities/User';

export default interface IUsersRepository {
  allUsersPagination(data: IDataPageDTO): Promise<ITotalUsersDTO>;

  findByIdNotPassword(id: string): Promise<any>;
  findById(id: string): Promise<any>;
  findByIdAllData(id: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findByCPF(cpf: string): Promise<any>;
  findByIdInfoUser(userId: string): Promise<User | null>;
  findByIdInfoPerson(userId: string): Promise<User | null>;

  createPersonAndPhoneAndAddresss({
    user,
    address,
    phone,
  }: ICreatePersonAndPhoneAndAddressDTO): Promise<any>;

  create(data: ICreateUserDTO): Promise<User>;
  update({ id, updateData }: IPropsUpdateData): Promise<User>;
}
