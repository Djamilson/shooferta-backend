import AppError from '@shared/errors/AppError';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { IUserGroupsDTO } from '../dtos/IUserGroupsDTO';
import { Person } from '../infra/typeprisma/entities/Person';
import IUsersRepository from '../repositories/IUsersRepository';
import { IUserSerializableDTO } from './../dtos/IUserSerealizableDTO';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<IUserSerializableDTO | null> {
    const user = await this.usersRepository.findByIdInfoUser(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const roles = user?.usersGroups.map((userGroup: IUserGroupsDTO) => {
      return userGroup.group.description;
    });

    const userSerealizable = {
      id: user.id,
      is_verified: user.is_verified,
      roles,
      firstName: user.person.name.split(' ')[0],

      person: plainToInstance(Person, user.person),
    };

    return userSerealizable;
  }
}

export default ShowUserService;
