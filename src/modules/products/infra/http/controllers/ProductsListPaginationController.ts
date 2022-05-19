import ListProductsPaginationService from '@modules/products/services/ListProductsPaginationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProductsListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q, status } = req.query;

    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListProductsPaginationService);

    const meProducts = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
      status: String(status) === 'true',
    });

    return res.json(meProducts);
  }
}

export { ProductsListPaginationController };
