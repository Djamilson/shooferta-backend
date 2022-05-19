import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStockService } from '@modules/stocks/services/CreateStockService';

class StocksController {
  /*public async index(req: Request, res: Response): Promise<Response> {
    try {
      const listStock = container.resolve(ListStockService);

      const stocks = await listStock.execute();
      return res.json(instanceToPlain(stocks));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }*/

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { stock, status, product_id, action } = req.body;

      const createStock = container.resolve(CreateStockService);

      const newStock = await createStock.execute({
        stock,
        status,
        product_id,
        action,
      });
      return res.json(instanceToPlain(newStock));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  /*public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { stock_id } = req.params;
      const { stock } = req.body;

      const updateStock = container.resolve(UpdateStockService);

      const newStock = await updateStock.execute({
        stock_id,
        stock,
      });

      return res.json(instanceToPlain(newStock));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }*/
}

export { StocksController };
