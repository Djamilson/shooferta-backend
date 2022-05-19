import { inject, injectable } from 'tsyringe';
import { SubCategory } from '../infra/typeprisma/entities/SubCategory';
import { ISubCategoriesRepository } from '../repositories/ISubCategoriesRepository';

@injectable()
class ListSubCategoryById {
  constructor(
    @inject('SubCategoriesRepository')
    private subCategoriesRepository: ISubCategoriesRepository,
  ) {}

  async execute(id: string): Promise<SubCategory | null> {
    const subCategory = await this.subCategoriesRepository.findById(id);

    return subCategory;
  }
}

export { ListSubCategoryById };
