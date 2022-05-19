import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePoliticService } from '@modules/politics/services/CreatePoliticService';
import { ListPoliticService } from '@modules/politics/services/ListPoliticService';
import { UpdatePoliticService } from '@modules/politics/services/UpdatePoliticService';
import { FindPoliticService } from '@modules/politics/services/FindPoliticService';
import { Pagination } from '@modules/politics/services/Pagination';

export default class PaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q, status } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(Pagination);

    const products = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(instanceToPlain(products));
  }
}
