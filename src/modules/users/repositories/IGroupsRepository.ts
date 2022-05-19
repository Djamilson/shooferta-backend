import { IPropsUpdateData } from '@modules/__DTOS';
import { Prisma } from '../../../../prisma/generated/postgres';
import { Group } from '../infra/typeprisma/entities/Group';

export default interface IGroupsRepository {
  findById(id: string): Promise<Group | null>;
  findAllById(groups: string[]): Promise<Group[]>;
  allGroups(): Promise<Group[] | null>;
  findByName(name: string): Promise<Group | null>;
  create(data: Prisma.GroupCreateInput): Promise<Group>;
  update({ id, updateData }: IPropsUpdateData): Promise<Group>;
}
