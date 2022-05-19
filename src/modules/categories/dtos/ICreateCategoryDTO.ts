import { TypeCategoryEnum } from '../../../../prisma/generated/postgres';

interface ICreateCategoryDTO {
  name: string;
  description: string;
  type: TypeCategoryEnum;
  slug?: string;
}

export { ICreateCategoryDTO };
