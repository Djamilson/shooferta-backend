import { UpdateEmailService } from '@modules/users/services/UpdateEmailService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateEmailController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      console.log('Cheogou:', req.body);
      const { email } = req.body;

      const updateEmail = container.resolve(UpdateEmailService);

      const user = await updateEmail.execute({
        user_id,
        email,
      });

      return res.json(instanceToPlain(user));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateEmailController };
