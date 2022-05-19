import { ICreateOrderDTO } from '@modules/orders/dtos/ICreateOrderDTO';
import { ITotalOrdersDTO } from '@modules/orders/dtos/ITotalOrdersDTO';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { StatusOrderEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { Order } from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data;

    const result = await this.prismaRepository.order.count({
      where: {
        OR: [
          {
            status: StatusOrderEnum.PROCESSING,
          },
          {
            status: StatusOrderEnum.AWAITING,
          },
        ],

        AND: {
          user: {
            person: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
      },
    });

    return result;
  }

  public async allOrderPagination(
    data: IDataPageDTO,
  ): Promise<ITotalOrdersDTO> {
    const { page, pageSize, query } = data;

    let orders = [] as Order[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      orders = (await this.prismaRepository.order.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          OR: [
            {
              status: StatusOrderEnum.PROCESSING,
            },
            {
              status: StatusOrderEnum.AWAITING,
            },
          ],

          AND: {
            user: {
              person: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
        orderBy: {
          user: {
            person: {
              name: 'asc',
            },
          },
        },
      })) as unknown as Order[];
    }

    return {
      result: orders,
      total,
    };
  }

  public async findById(id: string): Promise<Order | null> {
    const order = await this.prismaRepository.order.findUnique({
      where: { id },
    });
    return order as unknown as Order;
  }

  public async findAllOrdersToUserId(user_id: string): Promise<Order[] | null> {
    const order = await this.prismaRepository.order.findMany({
      where: { user_id },
    });
    return order as unknown as Order[];
  }

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const { total, freight, user_id, serializableProducts } = data;
    console.log('Vou criar order:', data);
    return this.prismaRepository.order.create({
      data: {
        total,
        freight,
        user_id,
        ordersProducts: {
          createMany: {
            data: serializableProducts,
          },
        },
      },
    }) as unknown as Order;
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Order> {
    const order = await this.prismaRepository.order.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return order as unknown as Order;
  }
}

export default OrdersRepository;
