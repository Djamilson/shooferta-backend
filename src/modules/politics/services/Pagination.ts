import { IDataPageDTO, IInfoDTO } from '@modules/__DTOS';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Politic } from '../infra/typeprisma/entities/Politic';
import { IPoliticsRepository } from '../repositories/IPoliticsRepository';

interface IPoliticsReturn {
  data: Politic[];
  info: IInfoDTO;
}

@injectable()
class Pagination {
  constructor(
    @inject('PoliticsRepository')
    private politicsRepository: IPoliticsRepository,
  ) {}

  async execute({
    page,
    pageSize,
    query,
  }: IDataPageDTO): Promise<IPoliticsReturn> {
    try {
      const { result, total } =
        await this.politicsRepository.allPoliticsPagination({
          page,
          pageSize,
          query,
        });

      const pages = Math.ceil(total / pageSize);

      const info = { page, pages, total, limit: pageSize };

      return { data: result, info };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { Pagination };
