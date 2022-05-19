import { CreateCategory } from '@modules/categories/services/CreateCategory';
import { ListCategories } from '@modules/categories/services/ListCategories';
import { ListCategoryByIdService } from '@modules/categories/services/ListCategoryByIdService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { TypeCategoryEnum } from '../../../../../../prisma/generated/postgres';

export default class CategoriesController {
  async show(request: Request, response: Response): Promise<Response> {
    const listCategoryById = container.resolve(ListCategoryByIdService);

    const category_id = request.params.categoryId;

    const category = await listCategoryById.execute(category_id);

    return response.status(200).json(instanceToPlain(category));
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listCategories = container.resolve(ListCategories);
      const { type } = req.params;

      const categories = await listCategories.execute({
        type: type === 'menu' ? TypeCategoryEnum.MENU : TypeCategoryEnum.SLIDE,
      });

      return res.status(200).json(categories);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, type } = req.body;

      const createCategory = container.resolve(CreateCategory);

      const category = await createCategory.execute({
        name,
        description,
        type,
      });
      return res.json(instanceToPlain(category));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
