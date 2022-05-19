import { instanceToPlain } from 'class-transformer';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import FinAllOrderToUserIdService from '@modules/orders/services/FindAllOrderToUserIdService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import { CreateOrderService } from '@modules/orders/services/CreateOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrder = container.resolve(FindOrderService);

    const order = await findOrder.execute({ id });

    return response.json(order);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findOrders = container.resolve(FinAllOrderToUserIdService);

    const orders = await findOrders.execute({ user_id });

    return response.json(instanceToPlain(orders));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const { freight, products, token, installments, payment_method_id } =
        req.body;
      console.log('user_id:', user_id);
      console.log('MeController:', req.body);

      const createOrder = container.resolve(CreateOrderService);

      const order = await createOrder.execute({
        user_id,
        installments,
        token,
        payment_method_id,
        products,
        freight,
      });

      return res.json(instanceToPlain({ order }));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
