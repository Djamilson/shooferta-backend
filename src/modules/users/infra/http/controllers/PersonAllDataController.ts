import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePersonAllDateService from '@modules/users/services/UpdatePersonAllDateService';

export default class PersonAllDataController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const updatePerson = container.resolve(UpdatePersonAllDateService);

      const person = await updatePerson.execute({ user_id, ...req.body });

      return res.json(instanceToPlain(person));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
