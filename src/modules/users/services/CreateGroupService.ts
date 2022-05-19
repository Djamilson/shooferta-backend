import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
//import { Group, GroupsNameEnum } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Group } from '../infra/typeprisma/entities/Group';

export function getDescriptionRoles(type: string) {
  const helpers: { [key: string]: string } = {
    'role-super-admin': 'Super Administrador',
    'role-admin': 'Administrador',
    'role-user': 'Usuário',
    'role-client': 'Colaborador',
  };

  const type1: string = helpers[type];

  return type1;
}

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Group> {
    const checkGroupExists = await this.groupsRepository.findByName(name);

    if (checkGroupExists) {
      throw new AppError('Group already used.');
    }

    const group = this.groupsRepository.create({
      name,
      description: getDescriptionRoles(name),
    });

    return group;
  }
}

export default CreateGroupService;
