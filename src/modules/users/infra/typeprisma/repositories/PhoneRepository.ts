import { ICreatePhoneDTO } from '@modules/users/dtos/ICreateDTO';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Phone } from '../entities/Phone';

class PhonesRepository implements IPhonesRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByPhone({
    person_id,
    phone,
  }: ICreatePhoneDTO): Promise<Phone | null> {
    console.log('Vai salvar::::', person_id, phone);
    const mePhone = await this.prismaRepository.phonePerson.findFirst({
      where: { person_id, phone },
      select: {
        id: true,
        person_id: true,
        phone: true,
      },
    });

    return mePhone as unknown as Phone;
  }

  public async findById(id: string): Promise<Phone | null> {
    return this.prismaRepository.phonePerson.findUnique({
      where: { id },
      select: {
        id: true,
        person_id: true,
        phone: true,
      },
    }) as unknown as Phone;
  }

  public async create(data: ICreatePhoneDTO): Promise<Phone> {
    return this.prismaRepository.phonePerson.create({
      data,
    }) as unknown as Phone;
  }

  public async createListPhone(phones: ICreatePhoneDTO[]): Promise<void> {
    this.prismaRepository.phonePerson.createMany({
      data: phones,
    });
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Phone> {
    const phonePerson = await this.prismaRepository.phonePerson.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return phonePerson as unknown as Phone;
  }

  public async delete(id: string): Promise<Phone> {
    const phonePerson = await this.prismaRepository.phonePerson.delete({
      where: {
        id,
      },
    });
    return phonePerson as unknown as Phone;
  }
}

export default PhonesRepository;
