import { inject, injectable } from 'tsyringe';
import { Description } from '../infra/typeprisma/entities/Description';
import { IDescriptionsRepository } from '../repositories/IDescriptionsRepository';


interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface IDescriptionsReturn {
  descriptions: Description[] | undefined;

  descriptionInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

@injectable()
class ListDescriptionsPaginationService {
  constructor(
    @inject('DescriptionsRepository')
    private descriptionsRepository: IDescriptionsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<IDescriptionsReturn> {
    const { result, total } =
      await this.descriptionsRepository.allDescription({
        page,
        pageSize,
        query,
      });

    const pages = Math.ceil(total / pageSize);

    const descriptionInfo = { page, pages, total, limit: pageSize };

    return { descriptions: result, descriptionInfo };
  }
}

export default ListDescriptionsPaginationService;
