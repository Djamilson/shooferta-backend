import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowPersonService from '@modules/users/services/ShowPersonService';

class PersonsController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { personId } = req.params;

      const showPerson = container.resolve(ShowPersonService);

      const person = await showPerson.execute({
        person_id: personId,
      });


      console.log(JSON.stringify(instanceToPlain(person), null, 2));

      return res.json(instanceToPlain(person));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}


export { PersonsController };
