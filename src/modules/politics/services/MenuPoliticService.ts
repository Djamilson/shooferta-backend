import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Politic } from '../infra/typeprisma/entities/Politic';
import { IPoliticsRepository } from '../repositories/IPoliticsRepository';

type IResponse = {
  id: string;
  name: string;
  href: string;
  toUpperCase: string;
};

@injectable()
class MenuPoliticService {
  constructor(
    @inject('PoliticsRepository')
    private politicsRepository: IPoliticsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<IResponse[] | undefined> {
    const cachekey = `politics`;

    let politics = await this.cacheProvider.recover<any>(cachekey);

    if (!politics) {
      const dBPolitics = await this.politicsRepository.allPolitics();

      const newPolitics = instanceToPlain(dBPolitics)?.map((politic: any) => {
        const { id, name, href, toUpperCase } = politic;
        return { id, name, href, toUpperCase };
      });

      const finallyPolitic = instanceToPlain(
        plainToInstance(Politic, newPolitics),
      );

      await this.cacheProvider.save(cachekey, finallyPolitic);

      politics = finallyPolitic;
    }

    return politics;
  }
}

export { MenuPoliticService };
