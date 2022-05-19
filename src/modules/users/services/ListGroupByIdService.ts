import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Group } from '../infra/typeprisma/entities/Group';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListGroupByIdService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Group | null> {
    try {
      return this.groupsRepository.findById(id);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListGroupByIdService };
