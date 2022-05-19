import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPhonesRepository from '../repositories/IPhonesRepository';

interface IRequest {
  idPhone: string;
}

@injectable()
class DeletePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  public async execute({ idPhone }: IRequest): Promise<void> {
    try {
      const checkPhoneExists = await this.phonesRepository.findById(idPhone);

      if (!checkPhoneExists) {
        throw new AppError('Phone does not exist.');
      }

      await this.phonesRepository.delete(checkPhoneExists.id);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default DeletePhoneService;
