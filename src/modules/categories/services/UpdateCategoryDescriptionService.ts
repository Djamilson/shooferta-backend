import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Category } from '../infra/typeprisma/entities/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  id: string;
  description: string;
}

@injectable()
class UpdateCategoryDescriptionService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, description }: IRequest): Promise<Category> {
    const myCategory = await this.categoriesRepository.findById(id);

    if (!myCategory) {
      throw new AppError('Category not found');
    }

     const cachekey = `categories`;
     const cachekeyCategory = `category:${id}`;

     await this.cacheProvider.invalidatePrefix(cachekey);
     await this.cacheProvider.invalidate(cachekeyCategory);


    return this.categoriesRepository.update({
      id,
      updateData: { description },
    });
  }
}

export { UpdateCategoryDescriptionService };
