import { inject, injectable } from 'tsyringe';
import { SubCategory } from '../infra/typeprisma/entities/SubCategory';
import { ISubCategoriesRepository } from '../repositories/ISubCategoriesRepository';

@injectable()
class ListSubCategories {
  constructor(
    @inject('SubCategoriesRepository')
    private subCategoriesRepository: ISubCategoriesRepository,
  ) {}

  async execute(): Promise<SubCategory[] | null> {
    const SubCategories = await this.subCategoriesRepository.allSubCategories();

    return SubCategories;
  }
}

export { ListSubCategories };
