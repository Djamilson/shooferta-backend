import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import ICreatePriceDTO from '../dtos/ICreatePriceDTO';
import ITotalPriceDTO from '../dtos/ITotalPriceDTO';
import { Price } from '../infra/typeprisma/entities/Price';

export default interface IPricesRepository {
  findByPrice(price: number): Promise<Price | null>;
  allPricePagination(data: IDataPageDTO): Promise<ITotalPriceDTO>;

  allPrices(): Promise<Price[] | null>;
  findById(id: string): Promise<Price | null>;
  create(data: ICreatePriceDTO): Promise<Price>;
  update({ id, updateData }: IPropsUpdateData): Promise<Price>;
  delete(id: string): Promise<Price>;
}
