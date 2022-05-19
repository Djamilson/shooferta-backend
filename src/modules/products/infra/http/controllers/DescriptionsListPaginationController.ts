import ListDescriptionsPaginationService from '@modules/products/services/ListDescriptionsPaginationService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DescriptionsListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q, status } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListDescriptionsPaginationService);

    const products = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(instanceToPlain(products));
  }
}

export { DescriptionsListPaginationController };
