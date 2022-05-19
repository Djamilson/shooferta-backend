import { ListProductInfoByIdService } from '@modules/productsInfo/services/ListProductInfoByIdService';
import { UpdateProductInfoService } from '@modules/productsInfo/services/UpdateProductInfoService';
import AppError from '@shared/errors/AppError';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductsInfoController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const listProductById = container.resolve(ListProductInfoByIdService);

      const productInfoId = request.params.productInfoId;

      const product = await listProductById.execute({ id: productInfoId });

      return response.status(200).json(instanceToPlain(product));
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { productInfoId } = req.params;

      const {
        price,
        price_promotion,
        stock,
        link,
        freight,
        company,
        currency,
      } = req.body;

      const updateProductInfo = container.resolve(UpdateProductInfoService);

      const newPrice = await updateProductInfo.execute({
        product_info_id: productInfoId,
        price,
        stock,
        price_promotion,
        link,
        freight,
        company,
        currency,
      });
      return res.json(instanceToPlain(newPrice));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
