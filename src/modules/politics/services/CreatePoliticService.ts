//import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';
import slug from '@shared/util/slug';
import { inject, injectable } from 'tsyringe';
import { Politic } from '../infra/typeprisma/entities/Politic';
import { IPoliticsRepository } from '../repositories/IPoliticsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreatePoliticService {
  constructor(
    @inject('PoliticsRepository')
    private politicsRepository: IPoliticsRepository /* @inject('CacheProvider')
    private cacheProvider: ICacheProvider,*/,
  ) {}

  async execute({ name, description }: IRequest): Promise<Politic | undefined> {
    const politicExists = await this.politicsRepository.findByName(name);

    if (politicExists) {
      throw new AppError('Politic already used.', 401);
    }

    const word_count = description.split(' ').length;
    const average_words_per_minute = 200;

    const reading_time = Math.ceil(word_count / average_words_per_minute);

    const myPolitic = await this.politicsRepository.create({
      name,
      description,
      slug: slug(name),
      reading_time,
    });

    //const cachekey = `politics`;

    //await this.cacheProvider.invalidate(cachekey);

    return myPolitic;
  }
}

export { CreatePoliticService };
