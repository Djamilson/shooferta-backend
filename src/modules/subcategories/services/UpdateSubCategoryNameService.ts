import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { SubCategory } from '../infra/typeprisma/entities/SubCategory';
import { ISubCategoriesRepository } from '../repositories/ISubCategoriesRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateSubCategoryNameService {
  constructor(
    @inject('SubCategoriesRepository')
    private categoriesRepository: ISubCategoriesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<SubCategory> {
    const checkSubCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (checkSubCategoryExists) {
      throw new AppError('SubCategory already used.');
    }

    const mySubCategory = await this.categoriesRepository.findById(id);

    if (!mySubCategory) {
      throw new AppError('SubCategory not found');
    }

    return this.categoriesRepository.update({ id, updateData: { name } });
  }
}

export { UpdateSubCategoryNameService };
