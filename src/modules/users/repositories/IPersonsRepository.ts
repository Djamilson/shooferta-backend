import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreatePersonDTO } from '../dtos/ICreateDTO';
import { Person } from '../infra/typeprisma/entities/Person';
export default interface IPersonsRepository {
  findById(id: string): Promise<Person | null>;
  create(data: ICreatePersonDTO): Promise<Person>;
  update({ id, updateData }: IPropsUpdateData): Promise<Person>;
  findAllAddressesToPerson(id: string): Promise<Person | null>;
  findAllPhonesToPersonId(id: string): Promise<Person | null>;
  findByEmail(email: string): Promise<Person | null>;
}
