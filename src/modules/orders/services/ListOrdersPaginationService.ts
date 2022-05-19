import { IDataPageDTO, IInfoDTO } from '@modules/__DTOS';
import { inject, injectable } from 'tsyringe';
import { Order } from '../infra/typeprisma/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IOrdersReturn {
  orders: Order[] | null;

  info: IInfoDTO;
}

@injectable()
class ListOrdersPaginationService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IDataPageDTO): Promise<IOrdersReturn> {
    const { result, total } = await this.ordersRepository.allOrderPagination({
      page,
      pageSize,
      query,
    });

    const pages = Math.ceil(total / pageSize);

    const info = { page, pages, total, limit: pageSize };

    return { orders: result, info };
  }
}

export default ListOrdersPaginationService;
