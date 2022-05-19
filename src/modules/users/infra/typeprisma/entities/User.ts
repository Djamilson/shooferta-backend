import { Exclude } from 'class-transformer';
import { Person } from './Person';
import { UserGroup } from './UserGroup';

class User {
  id: string;

  usersGroups: UserGroup[];
  person: Person;
  person_id: string;
  is_verified: boolean;

  @Exclude()
  password: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export default User;
