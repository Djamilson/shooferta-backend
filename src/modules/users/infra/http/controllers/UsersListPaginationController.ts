import { ListUsersPaginationService } from '@modules/users/services/ListUsersPaginationService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListUsersPaginationService);

    const users = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(instanceToPlain(users));
  }
}

export { UsersListPaginationController };
