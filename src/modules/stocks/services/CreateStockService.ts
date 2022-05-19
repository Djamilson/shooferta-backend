import { ICreateStockDTO } from '@modules/stocks/dtos/ICreateStockDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { Stock } from '../infra/typeprisma/entities/Stock';
import { IStocksRepository } from '../repositories/IStocksRepositories';

@injectable()
class CreateStockService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    stock,
    status,
    product_id,
    action,
  }: ICreateStockDTO): Promise<Stock | undefined> {
    const myStock = await this.stocksRepository.create({
      stock,
      status,
      product_id,
      action,
    });

    const cachekey = `stock-product:${product_id}`;
    await this.cacheProvider.invalidate(cachekey);

    return myStock;
  }
}

export { CreateStockService };
