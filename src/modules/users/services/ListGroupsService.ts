import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Group } from '../infra/typeprisma/entities/Group';
import IGroupsRepository from '../repositories/IGroupsRepository';

@injectable()
class ListGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(): Promise<Group[] | null> {
    try {
      const groups = await this.groupsRepository.allGroups();

      return groups;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListGroupsService };
