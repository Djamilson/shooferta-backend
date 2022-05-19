import { IInfoDTO } from '@modules/__DTOS';
import { inject, injectable } from 'tsyringe';
import { Price } from '../infra/typeprisma/entities/Price';
import IPricesRepository from '../repositories/IPricesRepository';

interface IPrice {
  price: string;
  product_id: string;
  user_id: string;
}

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface IPricesReturn {
  prices: Price[] | null;

  info: IInfoDTO;
}

@injectable()
class ListPricesPaginationService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<IPricesReturn> {
    const { result, total } = await this.pricesRepository.allPricePagination({
      page,
      pageSize,
      query,
    });

    const pages = Math.ceil(total / pageSize);

    const info = { page, pages, total, limit: pageSize };

    return { prices: result, info };
  }
}

export default ListPricesPaginationService;
