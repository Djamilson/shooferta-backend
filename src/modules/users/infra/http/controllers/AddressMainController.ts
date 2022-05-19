import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAddressMainService from '@modules/users/services/UpdateAddressMainService';

export default class AddresssMainController {

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      const { addressId } = req.params;
      const user_id = req.user.id;

      const upDateAddressMain = container.resolve(UpdateAddressMainService);

      const address = await upDateAddressMain.execute({
        addressId,
        user_id,
      });
      return res.json(instanceToPlain(address));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
