import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSubCategory } from '@modules/subcategories/services/CreateSubCategory';
import { ListSubCategories } from '@modules/subcategories/services/ListSubCategories';
import { ListSubCategoryById } from '@modules/subcategories/services/ListSubCategoryById';

export default class SubCategoriesController {
  async show(request: Request, response: Response): Promise<Response> {
    const listSubCategoryById = container.resolve(ListSubCategoryById);

    const category = await listSubCategoryById.execute(
      request.params.subCategory_id,
    );

    return response.status(200).json(category);
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listSubCategories = container.resolve(ListSubCategories);
      const subcategories = await listSubCategories.execute();

      return res.status(200).json(instanceToPlain(subcategories));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      const createSubCategory = container.resolve(CreateSubCategory);

      const category = await createSubCategory.execute({
        name,
      });
      return res.json(instanceToPlain(category));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
