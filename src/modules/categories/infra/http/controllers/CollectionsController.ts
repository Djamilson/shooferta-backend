import { ListCategoryProductsByIdCategoryService } from '@modules/categories/services/ListCategoryProductsByIdCategoryService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CollectionsController {
  async show(req: Request, response: Response): Promise<Response> {
    const { categoryId, page, limit, status, q } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const listCategoryProductsByIdCategoryService = container.resolve(
      ListCategoryProductsByIdCategoryService,
    );

    const category = await listCategoryProductsByIdCategoryService.execute({
      category_id: String(categoryId),
      page: Number(page),
      pageSize: Number(pageSize),
      status: String(status) === 'true',
      query,
    });

    return response.status(200).json(instanceToPlain(category));
  }
}

export { CollectionsController };
