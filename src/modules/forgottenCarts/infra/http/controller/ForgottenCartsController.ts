import { AllForgottenCartService } from '@modules/forgottenCarts/services/AllForgottenCartService';
import { CreateForgottenCartService } from '@modules/forgottenCarts/services/CreateForgottenCartService';
import { DestroyForgottenCartService } from '@modules/forgottenCarts/services/DestroyForgottenCartService';
import { InitialForgottenCartService } from '@modules/forgottenCarts/services/InitialForgottenCartService';
import { RemoveItemForgottenCartService } from '@modules/forgottenCarts/services/RemoveItemForgottenCartService';
import { UpdateForgottenCartService } from '@modules/forgottenCarts/services/UpdateForgottenCartService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgottenCartsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const allForgottenCartService = container.resolve(
        AllForgottenCartService,
      );

      const list = await allForgottenCartService.execute({
        user_id,
      });

      return res.status(202).json(instanceToPlain(list));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { product_id, amount } = req.body;
      const user_id = req.user.id;

      console.log("Estou aquiui:::")

      const createForgottenCartService = container.resolve(
        CreateForgottenCartService,
      );

      await createForgottenCartService.execute({
        product_id,
        amount,
        user_id,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { product_id, amount } = req.body;
      const user_id = req.user.id;

      const updateForgottenCartService = container.resolve(
        UpdateForgottenCartService,
      );

      await updateForgottenCartService.execute({
        product_id,
        amount,
        user_id,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const destroyForgottenCartService = container.resolve(
        DestroyForgottenCartService,
      );

      await destroyForgottenCartService.execute({
        user_id,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async removeItem(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;
      const user_id = req.user.id;

      const removeItemForgottenCartService = container.resolve(
        RemoveItemForgottenCartService,
      );

      await removeItemForgottenCartService.execute({
        product_id: productId,
        user_id,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async initial(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const { products } = req.body;

      console.log('Initial::', products);

      const initialForgottenCartService = container.resolve(
        InitialForgottenCartService,
      );

      const list = await initialForgottenCartService.execute({
        products,
        user_id,
      });

      return res.status(202).json(list);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
