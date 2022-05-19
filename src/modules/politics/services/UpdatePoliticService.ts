import { IPoliticsRepository } from '@modules/politics/repositories/IPoliticsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import slug from '@shared/util/slug';
import { inject, injectable } from 'tsyringe';
import { Politic } from '../infra/typeprisma/entities/Politic';

interface IRequest {
  politic_id: string;
  name: string;
  description: string;
}

@injectable()
class UpdatePoliticService {
  constructor(
    @inject('PoliticsRepository')
    private politicsRepository: IPoliticsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    politic_id,
    name,
    description,
  }: IRequest): Promise<Politic> {
    const politicExists = await this.politicsRepository.findById(politic_id);

    if (!politicExists) {
      throw new AppError('Politic not found');
    }

    const word_count = name.split(' ').length;
    const average_words_per_minute = 200;

    const reading_time = Math.ceil(word_count / average_words_per_minute);

    const cachekeyPolitic = `politic`;
    const cachekeyPolitics = `politics`;

    await this.cacheProvider.invalidate(cachekeyPolitics);
    await this.cacheProvider.invalidatePrefix(cachekeyPolitic);

    return this.politicsRepository.update({
      id: politic_id,
      updateData: { name, slug: slug(name), description, reading_time },
    });
  }
}

export { UpdatePoliticService };
