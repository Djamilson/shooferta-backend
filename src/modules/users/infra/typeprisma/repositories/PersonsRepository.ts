import { ICreatePersonDTO } from '@modules/users/dtos/ICreateDTO';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Person } from '../entities/Person';

class PersonsRepository implements IPersonsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findById(id: string): Promise<Person | null> {
    return this.prismaRepository.person.findUnique({
      where: { id },
      select: {
        id: true,
        avatar: true,
        birth_date: true,
        cpf: true,
        email: true,
        name: true,
        phone_id: true,
        address_id: true,
        rg: true,
        rgss: true,
        privacy: true,
        status: true,
        
        phone: {
          select: {
            id: true,
            person_id: true,
            phone: true,
          },
        },
        address: {
          select: {
            id: true,
            city: true,
            complement: true,
            neighborhood: true,
            number: true,
            person_id: true,
            state: true,
            street: true,
            zip_code: true,
          },
        },
      },
    }) as unknown as Person;
  }

  public async findAllAddressesToPerson(id: string): Promise<Person | null> {
    return this.prismaRepository.person.findUnique({
      where: { id },
      select: {
        id: true,
        address_id: true,
        addresses: {
          select: {
            id: true,
            city: true,
            complement: true,
            neighborhood: true,
            number: true,
            state: true,
            zip_code: true,
            person_id: true,
            street: true,
          },
        },
      },
    }) as unknown as Person;
  }

  public async findAllPhonesToPersonId(id: string): Promise<Person | null> {
    return this.prismaRepository.person.findUnique({
      where: { id },
      select: {
        id: true,
        phone_id: true,
        phones: {
          select: {
            id: true,
            phone: true,
          },
        },
      },
    }) as unknown as Person;
  }

  public async findByEmail(email: string): Promise<Person | null> {
    const person = await this.prismaRepository.person.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        privacy: true,
        avatar: true,
      },
    });

    return person as unknown as Person;
  }

  public async create(data: ICreatePersonDTO): Promise<Person> {
    return this.prismaRepository.person.create({
      data,
    }) as unknown as Person;
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Person> {
    console.log('Vou altualizar: id, updateData', id, updateData);
    const person = await this.prismaRepository.person.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return person as unknown as Person;
  }
}

export default PersonsRepository;
