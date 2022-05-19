import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePhoneMainService from '@modules/users/services/UpdatePhoneMainService';

export default class PhonesController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { phoneId } = req.params;
      const user_id = req.user.id;

      const upDatePhoneMain = container.resolve(UpdatePhoneMainService);

      const phone = await upDatePhoneMain.execute({
        phoneId,
        user_id,
      });
      return res.json(instanceToPlain(phone));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
