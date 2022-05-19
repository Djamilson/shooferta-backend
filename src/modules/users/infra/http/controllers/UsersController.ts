import CreateUserService from '@modules/users/services/CreateUserService';
import GetUserService from '@modules/users/services/GetUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import AppError from '@shared/errors/AppError';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      //const user_id = req.user.id;
      const user_id = req.params.userId;

      if (user_id !== req.params.userId) {
        throw new AppError('Incorrect email/password combination.', 402);
      }

      const showUser = container.resolve(ShowUserService);

      const userLogado = await showUser.execute({
        user_id,
      });
      return res.json(instanceToPlain(userLogado));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const getUser = container.resolve(GetUserService);

      const user = await getUser.execute({
        user_id,
      });
      
      return res.json(instanceToPlain(user));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, groups } = req.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
        groups,
      });

      return res.json(instanceToPlain(user));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UsersController };
