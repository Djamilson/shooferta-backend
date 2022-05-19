import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { IStocksRepository } from '../repositories/IStocksRepositories';

type IProps = {
  product_id: string;
};

type IResponse = {
  total: number | null;
};

@injectable()
class ListStockByProductIdService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ product_id }: IProps): Promise<IResponse> {
    const cachekey = `stock-product:${product_id}`;

    let total = await this.cacheProvider.recover<number>(cachekey);

    if (total === null) {
      total = await this.stocksRepository.findProductTotal(product_id);

      await this.cacheProvider.save(cachekey, total);
    }

    return { total };
  }
}

export { ListStockByProductIdService };
