import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Phone } from '../infra/typeprisma/entities/Phone';
import IPhonesRepository from '../repositories/IPhonesRepository';

interface IRequest {
  id: string;
  phone: string;
}

@injectable()
class UpdatePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  public async execute({ id, phone }: IRequest): Promise<Phone> {
    const checkPhoneExists = await this.phonesRepository.findById(id);

    if (!checkPhoneExists) {
      throw new AppError('Phone not exists.');
    }

    const checkPhoneEqual = await this.phonesRepository.findByPhone({
      phone,
      person_id: checkPhoneExists.person_id,
    });

    if (checkPhoneEqual) {
      throw new AppError('Phone already in used.');
    }

    return this.phonesRepository.update({ id, updateData: { phone } });
  }
}

export default UpdatePhoneService;
