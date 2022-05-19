import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { SubCategory } from '../infra/typeprisma/entities/SubCategory';
import { ISubCategoriesRepository } from '../repositories/ISubCategoriesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateSubCategory {
  constructor(
    @inject('SubCategoriesRepository')
    private subCategoriesRepository: ISubCategoriesRepository,
  ) {}

  async execute({ name }: IRequest): Promise<SubCategory | undefined> {
    const checkSubCategoryExists =
      await this.subCategoriesRepository.findByName(name);

    if (checkSubCategoryExists) {
      throw new AppError('SubCategory already used.');
    }

    return this.subCategoriesRepository.create({ name });
  }
}

export { CreateSubCategory };
