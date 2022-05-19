import { Category } from '@modules/categories/infra/typeprisma/entities/Category';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { TypeCategoryEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

type IProps = {
  type: TypeCategoryEnum;
};

@injectable()
class ListCategories {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ type }: IProps): Promise<any> {
    const cachekey = `categories:${type}`;

    let categories = await this.cacheProvider.recover<any>(cachekey);

    if (!categories) {
      const newCategories = await this.categoriesRepository.allByTypeCategories(
        type,
      );

      categories = instanceToPlain(plainToInstance(Category, newCategories));

      await this.cacheProvider.save(
        cachekey,
        instanceToPlain(plainToInstance(Category, newCategories)),
      );
    }

    return categories;
  }
}

export { ListCategories };
