import { IInfoDTO } from '@modules/__DTOS';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeprisma/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface IUsersReturn {
  users: User[] | undefined;
  info: IInfoDTO;
}

@injectable()
class ListUsersPaginationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<IUsersReturn> {
    const { result, total } = await this.usersRepository.allUsersPagination({
      page,
      pageSize,
      query,
    });

    console.log('=>>>', result, total);

    const pages = Math.ceil(total / pageSize);

    const info = { page, pages, total, limit: pageSize };

    return { users: result, info };
  }
}

export { ListUsersPaginationService };
