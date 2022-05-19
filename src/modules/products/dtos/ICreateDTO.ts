import {
  StockActionEnum,
  StocksStatusEnum,
} from '@shared/infra/prisma/postgres/generated/postgres';

type ICreateCategoryProductDTO = {
  category_id: string;
  product_id: string;
};

type ICreateDescriptionDTO = {
  description: string;
};

type ICreatePhotoDTO = {
  product_id: string;
  name: string;
};

type ICreateDTO = {
  sku: string;
  bar_code?: string;
  other?: object;
  description_id: string;
  subcategory_id: string;
};

type ICreatePriceDTO = {
  price: number;
  price_promotion: number;
};

type IStockDTO = {
  stock: number;
  action: StockActionEnum;
  status: StocksStatusEnum;
};

type IProductInfoDTO = {
  price: number;
  price_promotion: number;
  link: string;
  freight: number;
  company: string;
  currency: string;
  stock: number;
};

type ICreateProductDTO = {
  user_id: string;
  category_id: string;
  product: ICreateDTO;
  price: ICreatePriceDTO;
  stock: IStockDTO;
  productInfo: IProductInfoDTO;
};

export type {
  ICreateDTO,
  ICreateProductDTO,
  ICreatePhotoDTO,
  ICreateDescriptionDTO,
  ICreateCategoryProductDTO,
};
