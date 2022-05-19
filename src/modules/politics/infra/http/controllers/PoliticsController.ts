import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePoliticService } from '@modules/politics/services/CreatePoliticService';
import { ListPoliticService } from '@modules/politics/services/ListPoliticService';
import { UpdatePoliticService } from '@modules/politics/services/UpdatePoliticService';
import { FindPoliticService } from '@modules/politics/services/FindPoliticService';

export default class PoliticsController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { politicId } = req.params;

      const findPoliticService = container.resolve(FindPoliticService);

      const findPolitic = await findPoliticService.execute({ id: politicId });

      return res.json(instanceToPlain(findPolitic));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const listPolitic = container.resolve(ListPoliticService);

      const politics = await listPolitic.execute();
      return res.json(instanceToPlain(politics));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;

      const createPolitic = container.resolve(CreatePoliticService);

      const politic = await createPolitic.execute({
        name,
        description,
      });
      return res.json(instanceToPlain(politic));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { politicId } = req.params;
      const { name, description } = req.body;

      const updatePolitic = container.resolve(UpdatePoliticService);

      const politic = await updatePolitic.execute({
        politic_id: politicId,
        name,
        description,
      });

      return res.json(instanceToPlain(politic));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
