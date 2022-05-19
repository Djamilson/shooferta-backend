import { ListBannersByStatusService } from '@modules/banners/services/ListBannersByStatusService';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Banner } from '../../typeprisma/entities/Banner';

class GetBannersStatusController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listBanners = container.resolve(ListBannersByStatusService);

      const { status } = req.query;

      const banners = await listBanners.execute({
        status: String(status) === 'true',
      });

      return res.status(200).json(plainToInstance(Banner, banners));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
export { GetBannersStatusController };
