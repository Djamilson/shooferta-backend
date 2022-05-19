import AppError from '@shared/errors/AppError';
import { StatusOrderEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { inject, injectable } from 'tsyringe';
import { OrderProduct } from '../infra/typeprisma/entities/OrderProduct';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  orderProductId: string;
  status: string;
}

@injectable()
class UpdateOrderProductService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    orderProductId,
    status,
  }: IRequest): Promise<OrderProduct> {
    try {
      const checkOrderProductExists =
        await this.ordersProductsRepository.findById(orderProductId);

      if (!checkOrderProductExists) {
        throw new AppError('OrderProduct not exist.');
      }

      const order = await this.ordersRepository.findById(
        checkOrderProductExists.order_id,
      );

      if (!order) {
        throw new AppError('Order not exist.');
      }

      const helpers: { [key: string]: StatusOrderEnum } = {
        awaiting: StatusOrderEnum.AWAITING, //aguardando
        processing: StatusOrderEnum.PROCESSING, //em processamento
        processed: StatusOrderEnum.PROCESSED, //processado
        canceled: StatusOrderEnum.CANCELED, //cancelado
      };

      const orderProduct = await this.ordersProductsRepository.update({
        id: checkOrderProductExists.order_id,
        updateData: {
          status: helpers[status],
        },
      });

      const meListOrderProduct =
        await this.ordersProductsRepository.allOrdersProductsByOrderIdAndAWAITINGByPROCESSING(
          checkOrderProductExists.order_id,
        );

      if (
        meListOrderProduct.length > 0 &&
        order.status !== StatusOrderEnum.PROCESSING
      ) {
        await this.ordersRepository.update({
          id: order.id,
          updateData: { status: StatusOrderEnum.PROCESSING },
        });
      }

      if (
        meListOrderProduct.length === 0 &&
        order.status === StatusOrderEnum.PROCESSING
      ) {
        await this.ordersRepository.update({
          id: order.id,
          updateData: { status: StatusOrderEnum.PROCESSED },
        });
      }

      return orderProduct;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateOrderProductService };
