import { UpdateProfileDataService } from '@modules/users/services/UpdateProfileDataService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateProfileDataController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const { cpf, birth_date, name } = req.body;
      console.log('req.body:', req.body);

      const updatePerson = container.resolve(UpdateProfileDataService);

      const person = await updatePerson.execute({
        user_id,
        cpf,
        birth_date,
        name,
      });

      return res.json(instanceToPlain(person));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateProfileDataController };
