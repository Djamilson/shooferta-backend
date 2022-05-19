import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MenuPoliticService } from '@modules/politics/services/MenuPoliticService';
import { FindPoliticService } from '@modules/politics/services/FindPoliticService';

class MenuPoliticsController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const getMenuPolitic = container.resolve(FindPoliticService);

      const { politic_id } = req.params;

      const politics = await getMenuPolitic.execute({ id: politic_id });

      return res.json(instanceToPlain(politics));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const listPolitic = container.resolve(MenuPoliticService);

      const politics = await listPolitic.execute();
      return res.json(instanceToPlain(politics));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { MenuPoliticsController };
