// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Description } from '../infra/typeprisma/entities/Description';
import { IDescriptionsRepository } from '../repositories/IDescriptionsRepository';

type IProps = {
  description: string;
};
@injectable()
class CreateDescriptionService {
  constructor(
    @inject('DescriptionsRepository')
    private descriptionsRepository: IDescriptionsRepository,
  ) {}

  public async execute({ description }: IProps): Promise<Description> {
    try {
      const checkDescriptionExists =
        await this.descriptionsRepository.findByDescription(description);

      if (checkDescriptionExists) {
        return checkDescriptionExists;
      }

      const meDescripion = await this.descriptionsRepository.create({
        description: description.replace(/\s{2,}/g, ' '),
      });

      return meDescripion;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreateDescriptionService };
