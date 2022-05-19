import AppError from '@shared/errors/AppError';
import { instanceToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IPersonsRepository from '../repositories/IPersonsRepository';

interface IRequest {
  person_id: string;
}

@injectable()
class ShowPersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ person_id }: IRequest): Promise<any> {
    const person = await this.personsRepository.findById(person_id);

    if (!person) {
      throw new AppError('Person not found');
    }

    return instanceToPlain(person);
  }
}

export default ShowPersonService;
