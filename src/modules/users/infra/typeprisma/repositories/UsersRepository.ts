import { ICreatePersonAndPhoneAndAddressDTO, ICreateUserDTO } from '@modules/users/dtos/ICreateDTO';
import { ITotalUsersDTO } from '@modules/users/dtos/ITotalUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByCPF(cpf: string): Promise<User | null> {
    const meUser = this.prismaRepository.user.findFirst({
      where: { person: { cpf } },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
          },
        },
        usersGroups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
    return meUser as unknown as User;
  }

  public async findByName(name: string): Promise<User | null> {
    const meUser = await this.prismaRepository.user.findFirst({
      where: { person: { name: { equals: name, mode: 'insensitive' } } },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
          },
        },
        usersGroups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
    return meUser as unknown as User;
  }

  public async findByIdNotPassword(id: string): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id },
      select: {
        id: true,
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            cpf: true,
            birth_date: true,
            privacy: true,
            avatar: true,
          },
        },
      },
    });
  }

  public async findByIdAllData(id: string): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id },
      select: {
        id: true,
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
            cpf: true,
            rg: true,
            birth_date: true,
            phone: { select: { id: true, person_id: true, phone: true, } },
            address: {
              select: {
                id: true,
                number: true,
                street: true,
                complement: true,
                zip_code: true,
                city: true,
                state: true,
                neighborhood: true,
                person_id: true,
              },
            },
          },
        },
      },
    });
  }

  public async findById(id: string): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
            cpf: true,
            rg: true,
            birth_date: true,
            phone: { select: { id: true, person_id: true, phone: true } },
            address: {
              select: {
                id: true,
                number: true,
                street: true,
                complement: true,
                zip_code: true,
                city: true,
                state: true,
                neighborhood: true,
                person_id: true,
              },
            },
          },
        },
        usersGroups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }

  public async findByIdInfoPerson(user_id: string): Promise<any | null> {
    const user = await this.prismaRepository.user.findUnique({
      where: { id: user_id },

      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
            birth_date: true,
            cpf: true,
          },
        },
      },
    });

    return user;
  }

  public async findByIdInfoUser(user_id: string): Promise<any | null> {
    const user = await this.prismaRepository.user.findUnique({
      where: { id: user_id },

      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
          },
        },
        usersGroups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.prismaRepository.user.findFirst({
      where: { person: { email: { equals: email } } },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
          },
        },
        usersGroups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return user as unknown as User;
  }

  public async allUsers(): Promise<any> {
    return this.prismaRepository.user.findMany({});
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const { person, password, usersGroups } = data;

    const meUser = await this.prismaRepository.user.create({
      data: {
        password,
        person: {
          create: person,
        },
        // join table
        usersGroups: {
          create: usersGroups,
        },
      },
      select: {
        id: true,
        person: {
          select: {
            name: true,
            email: true,
          },
        },
        usersGroups: true,
      },
    });

    return meUser as unknown as User;
  }

  public async createPersonAndPhoneAndAddresss({
    user,
    address,
    phone,
  }: ICreatePersonAndPhoneAndAddressDTO): Promise<any> {
    return await this.prismaRepository.$transaction(async (): Promise<any> => {
      const { person, password, usersGroups } = user;

      const meUser = await this.prismaRepository.user.create({
        data: {
          password,
          person: {
            create: person,
          },
          // join table
          usersGroups: {
            create: usersGroups,
          },
        },
        select: {
          id: true,
          person: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          usersGroups: true,
        },
      });

      const newPhone = await this.prismaRepository.phonePerson.create({
        data: {
          phone,
          person_id: meUser.person.id,
        },
      });

      const newAddress = await this.prismaRepository.addressPerson.create({
        data: {
          ...address,
          person_id: meUser.person.id,
        },
      });

      return {
        user: meUser,
        phone: newPhone,
        address: newAddress,
      };
    });
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<User> {
    const user = await this.prismaRepository.user.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return user as unknown as User;
  }

  public async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data;
    return this.prismaRepository.user.count({
      where: {
        person: {
          name: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
      },
    });
  }

  public async allUsersPagination(data: IDataPageDTO): Promise<ITotalUsersDTO> {
    const { page, pageSize, query } = data;

    let users = [] as any[];

    console.log('=>>>', data);

    const total = await this.totalRegister(data);

    if (total > 0) {
      users = await this.prismaRepository.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          person: {
            name: {
              contains: query /* Optional filter */,
              mode: 'insensitive',
            },
          },
        },
        select: {
          id: true,
          person: {
            select: {
              id: true,
              name: true,
              email: true,
              created_at: true,
            },
          },
        },
        orderBy: {
          person: {
            name: 'asc',
          },
        },
      });
    }

    return {
      result: users,
      total,
    };
  }
}

export default UsersRepository;
