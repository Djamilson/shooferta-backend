import { CreatePhotoProductService } from '@modules/products/services/CreatePhotoProductService';
import { DeletePhotoService } from '@modules/products/services/DeletePhotoService';
import { ListPhotosProductsService } from '@modules/products/services/ListPhotosProductsService';
import { UpdatePriorityPhotoService } from '@modules/products/services/UpdatePriorityPhotoService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PhotosProductsController {
  async show(req: Request, response: Response): Promise<Response> {
    const { productId } = req.params;

    const listPhotosProductsService = container.resolve(
      ListPhotosProductsService,
    );

    const photosProduct = await listPhotosProductsService.execute({
      product_id: productId,
    });

    return response.status(200).json(instanceToPlain(photosProduct));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createPhotoProduct = container.resolve(CreatePhotoProductService);

    const { product_id } = req.body;

    console.log(':>> Estou aqui nesse', req.body);

    const photoProduct = await createPhotoProduct.execute({
      productId: product_id,
      photoFilename: req.file?.filename!,
    });

    return res.json(instanceToPlain(photoProduct));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { photoId } = req.params;
      const { priority } = req.body;

      console.log('req.body:', req.body);
      console.log(req.body);
      console.log(req.query);
      console.log('=>>', req.params);

      const updatePriorityPhotoService = container.resolve(
        UpdatePriorityPhotoService,
      );

      await updatePriorityPhotoService.execute({
        photoId,
        priority: Number(priority),
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { photoId } = req.params;

      const deletePhotoService = container.resolve(DeletePhotoService);

      await deletePhotoService.execute({
        photoId,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { PhotosProductsController };
