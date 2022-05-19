import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GePriceFreightService } from '@modules/freights/services/GePriceFreightService';

class FreightsController {
  async show(req: Request, response: Response): Promise<Response> {
    const { cep } = req.params;
    console.log(cep);

    const getPriceFreight = container.resolve(GePriceFreightService);

    const price = await getPriceFreight.execute({
      zipCode: cep,
    });
    console.log('=>>>', price);

    return response.status(200).json(price);
  }
}

export { FreightsController };
