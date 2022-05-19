import ICreatePageAccessesCounterDTO from '@modules/countsClicks/pageAccessesCounter/dtos/ICreatePageAccessesCounterDTO';
import IPageAccessCounterRepository from '@modules/countsClicks/pageAccessesCounter/repositories/IPageAccessesCounterRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { mongodb } from '@shared/infra/prisma/lib/prismaClient';
import { PageAccessCounter } from '../schemas/PageAccessCounter';

class PageAccessesCounterRepository implements IPageAccessCounterRepository {
  //private prismaRepository =  mongodb.$connect({});

  // set the connection options
  /*const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };*/

  private prismaRepository = mongodb;

  constructor() {
    this.prismaRepository;
  }

  public async findTotalPageAccessCounter(): Promise<number> {
    return this.prismaRepository.pageAccessCounter.count({});
  }

  public async create(
    data: ICreatePageAccessesCounterDTO,
  ): Promise<PageAccessCounter | any> {
    try {
      const newData = (await this.prismaRepository.pageAccessCounter.create({
        data,
      })) as unknown as PageAccessCounter;

      return newData;
    } catch (error: any) {
      if (error.hasErrorLabel('TransientTransactionError')) {
        console.log('TransientTransactionError, retrying transaction ...');
      } else {
        throw error;
      }
    }
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<PageAccessCounter> {
    const pageAccessCounter =
      await this.prismaRepository.pageAccessCounter.update({
        where: {
          id: String(id),
        },
        data: updateData,
      });
    return pageAccessCounter as unknown as PageAccessCounter;
  }
}

export default PageAccessesCounterRepository;
