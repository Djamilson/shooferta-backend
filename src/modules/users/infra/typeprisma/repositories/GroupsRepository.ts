import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Prisma } from '../../../../../../prisma/generated/postgres';
import { Group } from '../entities/Group';

class GroupsRepository implements IGroupsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findAllById(ids: string[]): Promise<Group[]> {
    const groups = await this.prismaRepository.group.findMany({
      where: { id: { in: ids } },
    });
    return groups as unknown as Group[];
  }

  public async findByName(name: string): Promise<Group | null> {
    const group = await this.prismaRepository.group.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    return group as unknown as Group;
  }

  public async allGroups(): Promise<Group[] | null> {
    return this.prismaRepository.group.findMany({}) as unknown as Group[];
  }

  public async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return this.prismaRepository.group.create({
      data,
    }) as unknown as Group;
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Group> {
    const group = await this.prismaRepository.group.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return group as unknown as Group;
  }

  public async findById(id: string): Promise<Group | null> {
    return this.prismaRepository.group.findUnique({
      where: { id },
    }) as unknown as Group;
  }

  public async delete(id: string): Promise<Group> {
    const group = await this.prismaRepository.group.delete({
      where: {
        id,
      },
    });
    return group as unknown as Group;
  }
}

export default GroupsRepository;
