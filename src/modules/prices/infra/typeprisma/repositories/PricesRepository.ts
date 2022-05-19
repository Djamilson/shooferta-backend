import ICreatePriceDTO from '@modules/prices/dtos/ICreatePriceDTO';
import ITotalPriceDTO from '@modules/prices/dtos/ITotalPriceDTO';
import IPricesRepository from '@modules/prices/repositories/IPricesRepository';
import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Price } from '../entities/Price';

class PricesRepository implements IPricesRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByPrice(price: number): Promise<Price | null> {
    const mePrice = await this.prismaRepository.price.findFirst({
      where: { price },
    });
    return mePrice as unknown as Price;
  }

  public async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data;
    return this.prismaRepository.price.count({
      where: {
        price: {
          //contains: query /* Optional filter */,
        },
      },
    });
  }

  public async allPricePagination(data: IDataPageDTO): Promise<ITotalPriceDTO> {
    const { page, pageSize, query } = data;

    let prices = [] as Price[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      prices = (await this.prismaRepository.price.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          price: {
            //query /* Optional filter */,
          },
        },
        orderBy: {
          price: 'asc',
        },
      })) as unknown as Price[];
    }

    return {
      result: prices,
      total,
    };
  }

  public async findById(id: string): Promise<Price | null> {
    const price = await this.prismaRepository.price.findUnique({
      where: { id },
    });
    return price as unknown as Price;
  }

  public async create(data: ICreatePriceDTO): Promise<Price | any> {
    try {
      console.log('data:', data);
      const price = await this.prismaRepository.price.create({
        data,
      }) as unknown as Price;

      return price;
    } catch (err) {
      console.log('erro:', err);
    }
  }

  public async allPrices(): Promise<Price[] | null> {
    const prices = await this.prismaRepository.price.findMany({});
    return prices as unknown as Price[];
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Price> {
    const price = await this.prismaRepository.price.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return price as unknown as Price;
  }

  public async delete(id: string): Promise<Price> {
    const price = await this.prismaRepository.price.delete({
      where: {
        id,
      },
    });
    return price as unknown as Price;
  }
}

export default PricesRepository;
