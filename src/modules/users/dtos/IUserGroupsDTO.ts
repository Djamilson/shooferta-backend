import { Group } from "../infra/typeprisma/entities/Group";
import User from "../infra/typeprisma/entities/User";

export type IGroupDTO = {
  id: string;
  name: string;
  description: string;
};

export type IUserGroupsDTO = {
  user: User;
  group: Group;
  user_id: string;
  group_id: string;
};
