import { UpdateCategoryTypeService } from '@modules/categories/services/UpdateCategoryTypeService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateTypeCategoriesController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId } = req.params;

      const { type } = req.body;

      const updateCategory = container.resolve(UpdateCategoryTypeService);

      const category = await updateCategory.execute({
        id: categoryId,
        type: type.toUpperCase(),
      });
      return res.json(instanceToPlain(category));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateTypeCategoriesController };
