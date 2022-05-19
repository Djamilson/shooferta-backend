import { Exclude } from 'class-transformer';
import { UsersGroups } from './UsersGroups';

export enum UseRoles {
  ROLESUPERADMIN = 'role-super-admin',
  ROLEADMIN = 'role-admin',
  ROLEUSER = 'role-user',
  ROLECLIENT = 'role-client',
}

export function getDescriptionRoles(type: string) {
  const helpers: { [key: string]: string } = {
    'role-super-admin': 'Super Administrador',
    'role-admin': 'Administrador',
    'role-user': 'Usuário',
    'role-client': 'Colaborador',
  };

  const type1: string = helpers[type];

  return type1;
}

class Group {
  id: string;
  usersGroups?: UsersGroups[];
  name: UseRoles;
  description: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { Group };
