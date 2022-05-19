import { CreateCategoryProductService } from '@modules/products/services/CreateCategoryProductService';
import { DeleteCategoryProductService } from '@modules/products/services/DeleteCategoryProductService';
import { ListCategoriesProductsService } from '@modules/products/services/ListCategoriesProductsService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CategoriesProductsController {
  async show(req: Request, response: Response): Promise<Response> {
    const { productId } = req.params;

    const listCategoriesProductsService = container.resolve(
      ListCategoriesProductsService,
    );

    const categories = await listCategoriesProductsService.execute({
      product_id: productId,
    });

    return response.status(200).json(instanceToPlain(categories));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId, productId } = req.body;

      console.log('categoryId, productId:: ', categoryId, productId);

      const createCategoryProduct = container.resolve(
        CreateCategoryProductService,
      );

      const product = await createCategoryProduct.execute({
        categoryId,
        productId,
      });

      return res.json(instanceToPlain(product));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId, productId } = req.params;

      const deleteCategoryProductService = container.resolve(
        DeleteCategoryProductService,
      );

      await deleteCategoryProductService.execute({
        category_id: categoryId,
        product_id: productId,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { CategoriesProductsController };
