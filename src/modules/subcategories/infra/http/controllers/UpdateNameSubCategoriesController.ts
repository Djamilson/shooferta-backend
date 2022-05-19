import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSubCategoryNameService } from '@modules/subcategories/services/UpdateSubCategoryNameService';

class UpdateNameSubCategoriesController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { subCategoryId } = req.params;

      const { name } = req.body;

      const updateSubCategory = container.resolve(UpdateSubCategoryNameService);

      const subCategory = await updateSubCategory.execute({
        id: subCategoryId,
        name,
      });
      return res.json(instanceToPlain(subCategory));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateNameSubCategoriesController };
