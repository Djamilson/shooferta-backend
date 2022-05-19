import { IInfoDTO } from '@modules/__DTOS';
import { inject, injectable } from 'tsyringe';
import { SubCategory } from '../infra/typeprisma/entities/SubCategory';

import { ISubCategoriesRepository } from '../repositories/ISubCategoriesRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface ISubCategoriesReturn {
  subCategories: SubCategory[] | undefined;
  info: IInfoDTO
}

@injectable()
class ListSubCategoriesPaginationService {
  constructor(
    @inject('SubCategoriesRepository')
    private subCategoriesRepository: ISubCategoriesRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<ISubCategoriesReturn> {
    const {
      result,
      total,
    } = await this.subCategoriesRepository.allCategoriesPagination({
      page,
      pageSize,
      query,
    });

    const pages = Math.ceil(total / pageSize);

    const info = { page, pages, total, limit: pageSize };

    return { subCategories: result, info };
  }
}

export default ListSubCategoriesPaginationService;
