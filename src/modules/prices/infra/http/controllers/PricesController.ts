import ListPricesService from '@modules/prices/services/AllPricesService';
import CreatePricesService from '@modules/prices/services/CreatePricesService';
import FindPriceService from '@modules/prices/services/FindPriceService';
import UpdatePricesService from '@modules/prices/services/UpdatePricesService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PricesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { priceId } = req.params;

    const findPrice = container.resolve(FindPriceService);

    const price = await findPrice.execute({ id: priceId });

    return res.json(instanceToPlain(price));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listPrices = container.resolve(ListPricesService);

    const prices = await listPrices.execute();

    return res.json(instanceToPlain(prices));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;
      const { price_promotion, price } = req.body;
      const user_id = req.user.id;

      console.log('>>> EStou Aqui::', req.body);
      const createPrice = container.resolve(CreatePricesService);

      const newPrice = await createPrice.execute({
        product_id: productId,
        user_id,
        price,
        price_promotion,
      });

      return res.json(instanceToPlain(newPrice));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { priceId } = req.params;
      const { price } = req.body;
      const updatePrice = container.resolve(UpdatePricesService);
      const newPrice = await updatePrice.execute({ price_id: priceId, price });
      return res.json(instanceToPlain(newPrice));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
