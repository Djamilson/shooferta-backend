import { ListSearchTypeAndStatusService } from '@modules/banners/services/ListSearchTypeAndStatusService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BannersListSearchTypeAndStatusController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listBanners = container.resolve(ListSearchTypeAndStatusService);

      const { type, status } = req.query;

      const banners = await listBanners.execute({
        type: String(type),
        status: String(status) === 'true',
      });

      return res.status(200).json(banners);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { BannersListSearchTypeAndStatusController };
