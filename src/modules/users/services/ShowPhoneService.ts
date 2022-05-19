import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Phone } from '../infra/typeprisma/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';

interface IRequest {
  phoneId: string;
}

@injectable()
class ShowPhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  public async execute({ phoneId }: IRequest): Promise<Phone | null> {
    const checkPhoneExists = await this.phonesRepository.findById(phoneId);

    if (!checkPhoneExists) {
      throw new AppError('Phone not found.');
    }

    return checkPhoneExists;
  }
}

export default ShowPhoneService;
