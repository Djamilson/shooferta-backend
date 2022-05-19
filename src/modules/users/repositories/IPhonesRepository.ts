import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreatePhoneDTO } from '../dtos/ICreateDTO';
import { Phone } from '../infra/typeprisma/entities/Phone';

export default interface IPhonesRepository {
  findByPhone(data: ICreatePhoneDTO): Promise<Phone | null>;
  createListPhone(phones: ICreatePhoneDTO[]): Promise<void>;

  findById(id: string): Promise<Phone | null>;
  create(data: ICreatePhoneDTO): Promise<Phone>;
  update({ id, updateData }: IPropsUpdateData): Promise<Phone>;
  delete(id: string): Promise<Phone>;
}
