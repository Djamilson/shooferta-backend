import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateBannerStatusService } from '@modules/banners/services/UpdateBannerStatusService';
import { Banner } from '../../typeprisma/entities/Banner';

class UpdateStatusBannersController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { bannerId } = req.params;
      const { status } = req.body;

      const updateBanner = container.resolve(UpdateBannerStatusService);

      const banner = await updateBanner.execute({
        id: bannerId,
        status,
      });

      return res.json(plainToInstance(Banner, banner));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateStatusBannersController };
