import { UserGroup } from '../infra/typeprisma/entities/UserGroup';

export default interface IUsersGroupsRepository {
  findById(id: string): Promise<UserGroup | null>;
  delete(id: string): Promise<UserGroup>;
}
