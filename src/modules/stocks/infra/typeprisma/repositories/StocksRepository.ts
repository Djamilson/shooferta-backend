import { ICreateStockDTO } from '@modules/stocks/dtos/ICreateStockDTO';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepositories';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { StocksStatusEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { Stock } from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findProductTotal(product_id: string): Promise<number | null> {
    const totalSTOCKIN = await this.prismaRepository.stock.aggregate({
      where: {
        product_id,
        status: {
          equals: StocksStatusEnum.STOCK_IN,
        },
      },
      _sum: {
        stock: true,
      },
    });

    const totalSTOCKOUT = await this.prismaRepository.stock.aggregate({
      where: {
        product_id,
        status: {
          equals: StocksStatusEnum.STOCK_OUT,
        },
      },
      _sum: {
        stock: true,
      },
    });

    const sumSTOCKIN =
      (totalSTOCKIN._sum?.stock && totalSTOCKIN?._sum?.stock) || 0;

    const sumSTOCKOUT =
      (totalSTOCKOUT._sum?.stock && totalSTOCKOUT?._sum?.stock) || 0;

    return Number(sumSTOCKIN - sumSTOCKOUT);
  }

  public async allStock(): Promise<Stock[] | null> {
    const stocks = await this.prismaRepository.stock.findMany({});
    return stocks as unknown as Stock[];
  }

  public async findById(id: string): Promise<Stock | null> {
    const stock = await this.prismaRepository.stock.findUnique({
      where: { id },
    });
    return stock as unknown as Stock;
  }

  public async create(data: ICreateStockDTO): Promise<Stock> {
    return this.prismaRepository.stock.create({
      data,
    }) as unknown as Stock;
  }

  public async createList(meData: ICreateStockDTO[]): Promise<void> {
    console.log("Vou alterar o stock:", JSON.stringify(meData, null, 2))
    await this.prismaRepository.stock.createMany({
      data: meData,
    });
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Stock> {
    const stock = await this.prismaRepository.stock.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return stock as unknown as Stock;
  }
}

export { StocksRepository };
