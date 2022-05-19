import { CreateProductService } from '@modules/products/services/CreateProductService';
import { ListProductByIdService } from '@modules/products/services/ListProductByIdService';
import { ListProductsService } from '@modules/products/services/ListProductsService';
import { UpdateProductOtherService } from '@modules/products/services/UpdateProductOtherService';
import AppError from '@shared/errors/AppError';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductsController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const listProductById = container.resolve(ListProductByIdService);

      const product_id = request.params.productId;

      const product = await listProductById.execute({ id: product_id });


      return response.status(200).json(product);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listProducts = container.resolve(ListProductsService);
      const products = await listProducts.execute();

      return res.status(200).json(instanceToPlain(products));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const {
        sku,
        bar_code,
        other,
        category_id,
        description_id,
        subcategory_id,
        price_promotion,
        price,
        productInfo,
      } = req.body;

      const createProduct = container.resolve(CreateProductService);

      const product = await createProduct.execute({
        user_id,
        sku,
        bar_code,
        other,
        price,
        price_promotion,
        category_id,
        description_id,
        subcategory_id,
        productInfo,
      });

        console.log('Agora Salvou:::: ', product);


      return res.json(instanceToPlain(product));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;
      const { other } = req.body;

      console.log(other);

      const updateProduct = container.resolve(UpdateProductOtherService);

      const product = await updateProduct.execute({
        productId,
        other,
      });

      return res.json(instanceToPlain(product));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
