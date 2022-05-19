import ListOrdersPaginationService from '@modules/orders/services/ListOrdersPaginationService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class OrdersListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q, typeCanceled, status } = req.query;
    const pageSize = limit;
    console.log('req.query>>', req.query);
    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListOrdersPaginationService);

    const orders = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(instanceToPlain(orders));
  }
}

export { OrdersListPaginationController };
