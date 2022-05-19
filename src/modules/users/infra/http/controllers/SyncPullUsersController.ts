import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SyncPullUsersService } from '@modules/users/services/SyncPullUsersService';

class SyncPullUsersController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id, name, avatar } = req.body;

      const syncPullUser = container.resolve(SyncPullUsersService);

      const user = await syncPullUser.execute({
        user_id,
        name,
        avatar,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { SyncPullUsersController };
