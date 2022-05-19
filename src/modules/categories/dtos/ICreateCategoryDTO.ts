import { TypeCategoryEnum } from '@shared/infra/prisma/postgres/generated/postgres';

interface ICreateCategoryDTO {
  name: string;
  description: string;
  type: TypeCategoryEnum;
  slug?: string;
}

export { ICreateCategoryDTO };
