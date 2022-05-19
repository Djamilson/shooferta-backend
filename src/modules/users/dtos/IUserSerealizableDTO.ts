import { Person } from "../infra/typeprisma/entities/Person";

export interface IUserSerializableDTO {
  id: string;
  is_verified: boolean;
  roles: string[];
  firstName: string;
  person: Person;
}

