import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DetailsProductByProductIdService } from '@modules/products/services/DetailsProductByProductIdService';

class DetailsProductController {
  async show(req: Request, response: Response): Promise<Response> {
    const { productId } = req.query;

    const detailsProductByProductId = container.resolve(
      DetailsProductByProductIdService,
    );

    const product = await detailsProductByProductId.execute({
      product_id: String(productId),
    });

    return response.status(200).json(product);
  }
}

export { DetailsProductController };
