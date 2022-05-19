import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPageAccessesCounterRepository from '../repositories/IPageAccessesCounterRepository';

@injectable()
class TotalClicksService {
  constructor(
    @inject('PageAccessesCounterRepository')
    private pageAccessesCounterRepository: IPageAccessesCounterRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<number> {
    try {
      const t =
        await this.pageAccessesCounterRepository.findTotalPageAccessCounter();
      return t;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { TotalClicksService };
