// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IPhonesRepository from '../repositories/IPhonesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

export type IRequest = {
  phone: string;
  user_id: string;
};

interface IPhone {
  id: string;
  phone: string;
  person_id: string;
  main: boolean;
}
@injectable()
class CreatePhoneService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ phone, user_id }: IRequest): Promise<IPhone> {
    try {

      console.log('phone, user_id ', phone, user_id);
      const checkUserExists = await this.usersRepository.findById(user_id);

      if (!checkUserExists) {
        throw new AppError('User not exists.');
      }

       console.log(
         'checkUserExists ',
         JSON.stringify(checkUserExists, null, 2),
       );

      const checkPhoneExists = await this.phonesRepository.findByPhone({
        phone,
        person_id: checkUserExists.person.id,
      });
      
      if (checkPhoneExists) {
        throw new AppError('Phone already used.', 401);
      }

      const newPhone = await this.phonesRepository.create({
        phone,
        person_id: checkUserExists.person.id,
      });

      const serealizablePhone = {
        id: newPhone.id,
        phone: newPhone.phone,
        person_id: newPhone.person_id,
        main: true,
      };

      await this.personsRepository.update({
        id: checkUserExists.person.id,
        updateData: { phone_id: newPhone.id },
      });

      return serealizablePhone;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default CreatePhoneService;
