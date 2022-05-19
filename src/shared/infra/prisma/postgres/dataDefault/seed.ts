import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import {
  groups,
  person,
  user,
  usersGroups,
} from '@shared/infra/prisma/postgres/dataDefault';

const seed = async () => {
  try {
    const { id, password } = user;
    await postgres.group.createMany({
      data: groups,
    });

    /*await postgres.person.createMany({
      data: person,
    });*/

    await postgres.user.create({
      data: {
        id,
        password,
        person: {
          create: person,
        },
        // join table
        /*usersGroups: {
          createMany: {
            data: usersGroups,
          },
        },*/
      },
    });
    console.log('Added user data');

    await postgres.userGroup.createMany({
      data: usersGroups,
    });

    console.log('Added usersGroups data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await postgres.$disconnect();
  }
};

seed();
