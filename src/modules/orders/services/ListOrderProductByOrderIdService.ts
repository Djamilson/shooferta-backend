import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { OrderProduct } from '../infra/typeprisma/entities/OrderProduct';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';

@injectable()
class ListOrderProductByOrderIdService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  async execute(orderId: string): Promise<OrderProduct[] | null> {
    try {
      const ordersProducts =
        await this.ordersProductsRepository.allOrdersProductsByOrderId(
          orderId,
        );

      return ordersProducts;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListOrderProductByOrderIdService };
