import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import slug from '@shared/util/slug';
import { inject, injectable } from 'tsyringe';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../infra/typeprisma/entities/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
class CreateCategory {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    name,
    description,
    type,
  }: ICreateCategoryDTO): Promise<Category | undefined> {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (checkCategoryExists) {
      throw new AppError('Category already used.');
    }
    const newCategory = {
      name,
      description,
      type,
      slug: slug(name),
    };

    const cachekey = `categories`;

    await this.cacheProvider.invalidatePrefix(cachekey);

    return this.categoriesRepository.create(newCategory);
  }
}

export { CreateCategory };
