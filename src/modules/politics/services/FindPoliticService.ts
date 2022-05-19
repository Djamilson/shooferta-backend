import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Politic } from '../infra/typeprisma/entities/Politic';
import { IPoliticsRepository } from '../repositories/IPoliticsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindPoliticService {
  constructor(
    @inject('PoliticsRepository')
    private politicsRepository: IPoliticsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<Politic | null> {
    const cachekey = `politic:${id}`;

    let politic = await this.cacheProvider.recover<any>(cachekey);

    if (!politic) {
      const newPolitic = await this.politicsRepository.findById(id);

      politic = instanceToPlain(plainToInstance(Politic, newPolitic));

      await this.cacheProvider.save(
        cachekey,
        instanceToPlain(plainToInstance(Politic, newPolitic)),
      );
    }

    return politic;
  }
}

export { FindPoliticService };
