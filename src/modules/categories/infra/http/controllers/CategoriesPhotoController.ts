import { UpdateCategoryPhotoService } from '@modules/categories/services/UpdateCategoryPhotoService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CategoriesPhotoController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    console.log('=>>>>categoryId', categoryId);

    const updateCategoryPhoto = container.resolve(UpdateCategoryPhotoService);

    const user = await updateCategoryPhoto.execute({
      id: categoryId,
      photoFilename: req.file?.filename,
    });

    return res.json(instanceToPlain(user));
  }
}

export { CategoriesPhotoController };
