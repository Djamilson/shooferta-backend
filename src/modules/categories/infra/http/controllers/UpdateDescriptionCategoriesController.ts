import { UpdateCategoryDescriptionService } from '@modules/categories/services/UpdateCategoryDescriptionService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateDescriptionCategoriesController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId } = req.params;

      const { description } = req.body;

      const updateCategory = container.resolve(
        UpdateCategoryDescriptionService,
      );

      const category = await updateCategory.execute({
        id: categoryId,
        description,
      });
      return res.json(instanceToPlain(category));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateDescriptionCategoriesController };
