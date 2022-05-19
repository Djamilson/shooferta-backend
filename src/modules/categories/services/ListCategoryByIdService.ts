import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { Category } from '../infra/typeprisma/entities/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
class ListCategoryByIdService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(id: string): Promise<Category | null> {
    const cachekey = `category:${id}`;

    let category = await this.cacheProvider.recover<Category>(cachekey);

    if (!category) {
      category = await this.categoriesRepository.findById(id);

      await this.cacheProvider.save(cachekey, category);
    }

    return category;
  }
}

export { ListCategoryByIdService };
