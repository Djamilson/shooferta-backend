import { ListStockByProductIdService } from '@modules/stocks/services/ListStockByProductIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StocksProductIdController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;
      const listStock = container.resolve(ListStockByProductIdService);

      const stocks = await listStock.execute({ product_id: productId });
      return res.json(stocks);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { StocksProductIdController };
