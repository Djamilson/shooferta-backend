import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreateProductInfoDTO } from '../dtos/ICreateProductInfoDTO';
import { ProductInfo } from '../infra/typeprisma/entities/ProductInfo';

export default interface IProductsInfoRepository {
  findById(id: string): Promise<ProductInfo | null>;
  create(data: ICreateProductInfoDTO): Promise<ProductInfo>;
  allProductInfos(): Promise<ProductInfo[] | null>;
  update({ id, updateData }: IPropsUpdateData): Promise<ProductInfo>;
  delete(id: string): Promise<ProductInfo>;
}
