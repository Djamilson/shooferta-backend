import { UpdateNameEmailService } from '@modules/users/services/UpdateNameEmailService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateNameEmailController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const { name, email } = req.body;

      const updateProfileClient = container.resolve(UpdateNameEmailService);

      const person = await updateProfileClient.execute({
        user_id,
        name,
        email,
      });

      return res.json(instanceToPlain(person));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateNameEmailController };
