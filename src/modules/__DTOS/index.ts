import { ObjectId } from "bson";

type IDataPageDTO = {
  page: number;
  pageSize: number;
  query: string;
};

type IInfoDTO = {
  page: number;
  pages: number;
  total: number;
  limit: number;
};

type IPropsUpdateData = {
  id: string | ObjectId;
  updateData: any;
};

export type { IDataPageDTO, IInfoDTO, IPropsUpdateData };
