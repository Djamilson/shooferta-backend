import { StatusOrderEnum } from '../../../../prisma/generated/postgres';

type ISerializableProduct = {
  product_id: string;
  price_id: string;
  quantity: number;
  subtotal: number;
  user_id: string;
};

export type ICreateOrderDTO = {
  user_id: string;
  serializableProducts: ISerializableProduct[];
  total: number;
  freight: number;
  status: StatusOrderEnum;
};
