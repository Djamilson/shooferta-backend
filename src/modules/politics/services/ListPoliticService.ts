import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Politic } from '../infra/typeprisma/entities/Politic';
import { IPoliticsRepository } from '../repositories/IPoliticsRepository';

@injectable()
class ListPoliticService {
  constructor(
    @inject('PoliticsRepository')
    private politicsRepository: IPoliticsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<Politic[] | null> {
    const cachekey = `politics`;

    let politics = await this.cacheProvider.recover<any>(cachekey);

    if (!politics) {
      const newPolitics = await this.politicsRepository.allPolitics();
      politics = instanceToPlain(plainToInstance(Politic, newPolitics));

      await this.cacheProvider.save(
        cachekey,
        instanceToPlain(plainToInstance(Politic, newPolitics)),
      );
    }

    return politics;
  }
}

export { ListPoliticService };
