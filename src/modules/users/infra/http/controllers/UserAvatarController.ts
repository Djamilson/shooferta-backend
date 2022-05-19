import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const person = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename,
    });
console.log('person::', JSON.stringify(person, null, 2));
console.log('person::', JSON.stringify(instanceToPlain(person), null, 2));

    return res.json(instanceToPlain(person));
  }
}
