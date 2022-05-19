import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSubCategoriesPaginationService from '@modules/subcategories/services/ListSubCategoriesPaginationService';

class SubCategoriesListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListSubCategoriesPaginationService);

    const subCategories = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(instanceToPlain(subCategories));
  }
}

export { SubCategoriesListPaginationController };
