import { UserGroup } from "@shared/infra/prisma/postgres/generated/postgres";

export default interface IUsersGroupsRepository {
  findById(id: string): Promise<UserGroup | null>;
  delete(id: string): Promise<UserGroup>;
}
