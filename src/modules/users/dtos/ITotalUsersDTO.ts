import { User } from '@prisma/client';

export type ITotalUsersDTO = {
  result: User[];
  total: number;
};
