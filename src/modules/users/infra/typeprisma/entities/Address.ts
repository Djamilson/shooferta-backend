import { Exclude } from 'class-transformer';
import { Person } from './Person';

class Address {
  id: string;
  number: number;
  street: string;
  complement?: string | null;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  person?: Person;
  person_id: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { Address };
