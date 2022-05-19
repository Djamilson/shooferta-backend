import { CreatePageAccessCounterService } from '@modules/countsClicks/pageAccessesCounter/services/CreatePageAccessCounterService';
import { TotalClicksService } from '@modules/countsClicks/pageAccessesCounter/services/TotalClicksService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PageAccessesCounterController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { metadata } = req.body;

      const createPageAccessCounterService = container.resolve(
        CreatePageAccessCounterService,
      );

      await createPageAccessCounterService.execute({
        metadata,
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      console.log('controller');
      const totalClicksService = container.resolve(TotalClicksService);

      const list = await totalClicksService.execute();

      return res.status(202).json(list);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
