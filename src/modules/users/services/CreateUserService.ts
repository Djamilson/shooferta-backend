import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeprisma/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

type IGroupRequest = {
  id: string;
};
interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf?: string;
  groups: IGroupRequest[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    groups,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email already used.', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const personSerealizable = {
      name,
      status: true,
      email,
      cpf,
    };

    const roles = await this.groupsRepository.findAllById(
      groups.map(group => group.id),
    );

      const user = await this.usersRepository.create({
      person: personSerealizable,
      password: hashedPassword,
      usersGroups: roles.map(group => {
        return {
          group_id: group.id,
        };
      }),
    });

    return user;
  }
}

export default CreateUserService;
