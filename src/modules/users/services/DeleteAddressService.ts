import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
  idAddress: string;
}

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ idAddress }: IRequest): Promise<void> {
    try {
      const checkAddressExists = await this.addressesRepository.findById(
        idAddress,
      );

      if (!checkAddressExists) {
        throw new AppError('Address does not exist.');
      }

      await this.addressesRepository.delete(checkAddressExists.id);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default DeleteAddressService;
