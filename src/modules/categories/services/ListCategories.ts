import { Category } from '@modules/categories/infra/typeprisma/entities/Category';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { TypeCategoryEnum } from '../../../../prisma/generated/postgres';
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
