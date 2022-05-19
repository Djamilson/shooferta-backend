import { CreateDescriptionService } from '@modules/products/services/CreateDescriptionService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

//import { ListDescriptions } from '@modules/descriptions/services/ListDescriptions';
//import { ListDescriptionById } from '@modules/descriptions/services/ListDescriptionById';

export default class DescriptionsController {
  /*async show(request: Request, response: Response): Promise<Response> {
    const listDescriptionById = container.resolve(ListDescriptionById);

    const description_id = request.params.descriptionId;

    const description = await listDescriptionById.execute(description_id);

    return response.status(200).json(instanceToPlain(description));
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listDescriptions = container.resolve(ListDescriptions);
      const descriptions = await listDescriptions.execute();

      return res.status(200).json(instanceToPlain(descriptions));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
*/
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { description } = req.body;

      const createDescription = container.resolve(CreateDescriptionService);

      const newDescription = await createDescription.execute({
        description,
      });

      return res.json(instanceToPlain(newDescription));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
