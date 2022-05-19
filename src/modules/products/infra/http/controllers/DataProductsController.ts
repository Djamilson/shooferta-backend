import { UpdateProductDataService } from '@modules/products/services/UpdateProductDataService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DataProductsController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const { productId } = req.params;
      const { sku, bar_code, description_id, subcategory_id } = req.body;

      console.log('req.body:', req.body);

      const updateProduct = container.resolve(UpdateProductDataService);

      const product = await updateProduct.execute({
        product_id: productId,
        sku,
        bar_code,
        description_id,
        subcategory_id,
      });

      return res.json(instanceToPlain(product));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { DataProductsController };
