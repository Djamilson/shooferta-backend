import IUsersGroupsRepository from '@modules/users/repositories/IUsersGroupsRepository';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { UserGroup } from '../entities/UserGroup';

class UsersGroupsRepository implements IUsersGroupsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findById(id: string): Promise<UserGroup | null> {
    return this.prismaRepository.userGroup.findUnique({
      where: { id },
    }) as unknown as UserGroup;
  }

  public async delete(id: string): Promise<UserGroup> {
    const userGroup = await this.prismaRepository.userGroup.delete({
      where: {
        id,
      },
    });
    return userGroup as unknown as UserGroup;
  }
}

export default UsersGroupsRepository;
