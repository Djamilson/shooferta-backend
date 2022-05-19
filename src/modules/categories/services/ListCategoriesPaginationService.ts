import { IInfoDTO } from '@modules/__DTOS';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Category } from '../infra/typeprisma/entities/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface ICategoriesReturn {
  categories: Category[] | undefined;
  info: IInfoDTO;
}

@injectable()
class ListCategoriesPaginationService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<ICategoriesReturn> {
    const cachekey = `categories:${page}:${pageSize}-${query}`;

    let categories = await this.cacheProvider.recover<ICategoriesReturn>(
      cachekey,
    );

    if (!categories) {
      const { result, total } =
        await this.categoriesRepository.allCategoriesPagination({
          page,
          pageSize,
          query,
        });

      const pages = Math.ceil(total / pageSize);

      const info = { page, pages, total, limit: pageSize };

      const meCategories = {
        categories: plainToInstance(Category, result),
        info,
      };

      categories = meCategories;

      await this.cacheProvider.save(cachekey, meCategories);
    }

    return categories;
  }
}

export default ListCategoriesPaginationService;
