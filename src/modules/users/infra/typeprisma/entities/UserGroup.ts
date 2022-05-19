import { Exclude } from 'class-transformer';
import { Group } from './Group';
import User from './User';

class UserGroup {
  user: User;
  group: Group;
  group_id: string;
  user_id: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}

export { UserGroup };
