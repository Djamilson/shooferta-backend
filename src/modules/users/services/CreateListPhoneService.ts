// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IPhone {
  phone: string;
}

interface IRequest {
  phones: IPhone[];
  user_id: string;
}

@injectable()
class CreatePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ phones, user_id }: IRequest): Promise<void> {
    try {
      const checkUserExists = await this.usersRepository.findById(user_id);

      if (!checkUserExists) {
        throw new AppError('User not exists.');
      }
      const { person_id } = checkUserExists;

      const phoneSerealizable = phones.map((phone: IPhone) => {
        return {
          ...phone,
          person_id,
        };
      });

      const listPhone =
        this.phonesRepository.createListPhone(phoneSerealizable);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default CreatePhoneService;
