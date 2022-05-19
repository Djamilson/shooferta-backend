import { CategoryProduct } from '@modules/products/infra/typeprisma/entities/CategoryProduct';
import { IInfoDTO } from '@modules/__DTOS';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

type IRequest = {
  category_id: string;
  page: number;
  pageSize: number;
  status: boolean;
  query: string;
};
interface IProductsReturn {
  products: CategoryProduct[] | undefined;
  info: IInfoDTO;
}
@injectable()
class ListCategoryProductsByIdCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    category_id,
    page,
    pageSize,
    query,
    status,
  }: IRequest): Promise<IProductsReturn> {
    const cachekey = `categories:${category_id}-${page}:${pageSize}-${status}-${query}`;

    let categoriesProducts = await this.cacheProvider.recover<IProductsReturn>(
      cachekey,
    );

    if (!categoriesProducts) {
      const { result, total } =
        await this.categoriesRepository.allCategoryProductPagination({
          category_id,
          page,
          pageSize,
          query,
          status,
        });

      const pages = Math.ceil(total / pageSize);

      const info = { page, pages, total, limit: pageSize };

      const meProductCategories = { products: result, info };

      categoriesProducts = meProductCategories;

      await this.cacheProvider.save(cachekey, meProductCategories);
    }

    return categoriesProducts;
  }
}

export { ListCategoryProductsByIdCategoryService };
