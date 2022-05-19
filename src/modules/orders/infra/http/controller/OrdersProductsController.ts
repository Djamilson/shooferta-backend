import { instanceToPlain } from 'class-transformer';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UpdateOrderProductService } from '@modules/orders/services/UpdateOrderProductService';
import { ListOrderProductByOrderIdService } from '@modules/orders/services/ListOrderProductByOrderIdService';

export default class OrdersProductsController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const listOrderProductByOrderId = container.resolve(
        ListOrderProductByOrderIdService,
      );

      const order_id = req.params.orderId;

      console.log('request.params::', req.params);
      const listOrdersProducts = await listOrderProductByOrderId.execute(
        order_id,
      );

      return res.status(200).json(instanceToPlain(listOrdersProducts));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { orderProductId } = req.params;
      const { status } = req.body;

      console.log('aqui:', orderProductId);
      console.log('req.body:', req.body);

      const updateOrder = container.resolve(UpdateOrderProductService);

      const order = await updateOrder.execute({
        status,
        orderProductId,
      });

      return res.json(instanceToPlain({ order }));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
