import { Exclude } from 'class-transformer';
import { Person } from './Person';

class Phone {
  id: string;
  phone: string;
  person: Person;
  person_id: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { Phone };
