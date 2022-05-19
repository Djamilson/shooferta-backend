import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGroupService from '@modules/users/services/CreateGroupService';
import AppError from '@shared/errors/AppError';
import { ListGroupsService } from '@modules/users/services/ListGroupsService';
import { ListGroupByIdService } from '@modules/users/services/ListGroupByIdService';

export default class GroupController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const listGroupById = container.resolve(ListGroupByIdService);

      const group_id = request.params.groupId;

      const group = await listGroupById.execute({ id: group_id });

      return response.status(200).json(instanceToPlain(group));
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listGroups = container.resolve(ListGroupsService);
      const groups = await listGroups.execute();

      return res.status(200).json(instanceToPlain(groups));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const createGroup = container.resolve(CreateGroupService);

      const group = await createGroup.execute({ name, description });

      return res.json(instanceToPlain(group));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
