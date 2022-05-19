import ListBannersPaginationService from '@modules/banners/services/ListBannersPaginationService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BannersListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q, status } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListBannersPaginationService);

    const banners = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
      status: String(status) === 'true',
    });


    return res.json(instanceToPlain(banners));
  }
}

export { BannersListPaginationController };
