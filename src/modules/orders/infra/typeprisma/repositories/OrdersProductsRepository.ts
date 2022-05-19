import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { StatusOrderEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { OrderProduct } from '../entities/OrderProduct';

class OrdersProductsRepository implements IOrdersProductsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async allOrdersProductsByOrderIdAndAWAITINGByPROCESSING(
    orderId: string,
  ): Promise<OrderProduct[]> {
    const orderProduct = await this.prismaRepository.orderProduct.findMany({
      where: {
        order_id: orderId,

        AND: [
          {
            status: StatusOrderEnum.PROCESSING,
          },
          {
            status: StatusOrderEnum.AWAITING,
          },
        ],
      },
      select: {
        user: {
          select: {
            person: {
              select: {
                name: true,
                address: true,
                phone: true,
              },
            },
          },
        },
        product: {
          include: {
            product_info: true,
            description: true,
            subcategory: true,
            price: true,
          },
        },
      },
    });

    return orderProduct as unknown as OrderProduct[];
  }

  public async allOrdersProductsByOrderId(
    orderId: string,
  ): Promise<OrderProduct[] | null> {
    const orderProduct = await this.prismaRepository.orderProduct.findMany({
      where: {
        order_id: orderId,
      },
      select: {
        user: {
          select: {
            person: {
              select: {
                name: true,
                address: true,
                phone: true,
              },
            },
          },
        },
        product: {
          include: {
            product_info: true,
            description: true,
            subcategory: true,
            price: true,
          },
        },
      },
    });

    return orderProduct as unknown as OrderProduct[];
  }

  public async findById(id: string): Promise<OrderProduct | null> {
    const orderProduct = await this.prismaRepository.orderProduct.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            product_info: true,
            description: true,
            subcategory: true,
            price: true,
          },
        },
      },
    });
    return orderProduct as unknown as OrderProduct;
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<OrderProduct> {
    const orderProduct = await this.prismaRepository.orderProduct.update({
      where: {
        id,
      },
      data: updateData,
    });
    return orderProduct as unknown as OrderProduct;
  }
}

export default OrdersProductsRepository;
