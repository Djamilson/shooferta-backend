import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Person } from '../infra/typeprisma/entities/Person';
import User from '../infra/typeprisma/entities/User';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<Person> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('Only authenticated user can change avatar.', 401);
    }

    if (checkUserExists?.person.avatar) {
      await this.storageProvider.deleteFile(checkUserExists.person.avatar);
    }

    if (!avatarFilename) {
      throw new AppError('Only authenticated user can change avatar.', 402);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    const newPerson = await this.personsRepository.update({
      id: checkUserExists.person.id,
      updateData: { avatar: filename },
    });

    return plainToInstance(Person, newPerson);
  }
}

export default UpdateUserAvatarService;
