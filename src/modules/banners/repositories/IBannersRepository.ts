import { IPropsUpdateData } from '@modules/__DTOS';
import IBannerPageDTO from '../dtos/IBannerPageDTO';
import { ICreateBannerDTO } from '../dtos/ICreateBannerDTO';
import { ISearchTypeAndStatus } from '../dtos/ISearchTypeAndStatus';
import ITotalBannersDTO from '../dtos/ITotalBannersDTO';
import { Banner } from '../infra/typeprisma/entities/Banner';

export type IPropsSearchNameAndType = {
  name: string;
  type: string;
};

interface IBannersRepository {
  findByName(name: string): Promise<Banner | null>;
  allByStatus(status: boolean): Promise<Banner[] | null>;
  allBannerPagination(object: IBannerPageDTO): Promise<ITotalBannersDTO>;

  allSearchTypeAndStatus(data: ISearchTypeAndStatus): Promise<Banner[]>;
  allBanners(): Promise<Banner[] | null>;
  findById(id: string): Promise<Banner | null>;
  create(data: ICreateBannerDTO): Promise<Banner>;
  update({ id, updateData }: IPropsUpdateData): Promise<Banner>;
  delete(id: string): Promise<Banner>;
}

export { IBannersRepository };
