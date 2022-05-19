import { IInfoDTO } from '@modules/__DTOS';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getUrlImage } from '../../../utils/getUrlImage';
import { Photo } from '../infra/typeprisma/entities/Photo';
import { Product } from '../infra/typeprisma/entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
  status: boolean;
}

interface IProductsReturn {
  products: any;
  info: IInfoDTO;
}

@injectable()
class ListProductsPaginationService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
    status,
  }: IRequest): Promise<IProductsReturn> {
    const cachekey = `products:${page}-${pageSize}-${status}-${query}`;

    let products = await this.cacheProvider.recover<any>(cachekey);

    if (!products) {
      const { result, total } =
        await this.productsRepository.findProductToDescription({
          page,
          pageSize,
          query,
          status,
        });

      const pages = Math.ceil(total / pageSize);

      const info = { page, pages, total, limit: pageSize };

      const meProducts = result?.map((p: Product) => {
        const thumbnail_url =
          p.photos && p.photos.length > 0 && getUrlImage(p.photos[0].name);

        return {
          ...p,
          thumbnail_url,
          photos: instanceToPlain(plainToInstance(Photo, p.photos)),
        };
      });

      const finallyProducts = { products: meProducts, info };

      await this.cacheProvider.save(cachekey, finallyProducts);

      products = finallyProducts;
    }

    return products;
  }
}

export default ListProductsPaginationService;
