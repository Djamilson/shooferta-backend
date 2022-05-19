import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPageAccessesCounterRepository from '../repositories/IPageAccessesCounterRepository';

interface IRequest {
  metadata: object;
}
@injectable()
class CreatePageAccessCounterService {
  constructor(
    @inject('PageAccessesCounterRepository')
    private pageAccessesCounterRepository: IPageAccessesCounterRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ metadata }: IRequest): Promise<void> {
    try {
      await this.pageAccessesCounterRepository.create({
        metadata,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreatePageAccessCounterService };
