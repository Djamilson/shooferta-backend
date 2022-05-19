import { UpdateBannerPriorityService } from '@modules/banners/services/UpdateBannerPriorityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BannersPriorityController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { bannerId } = req.params;
      const { priority } = req.body;

        const updateBannerPriorityService = container.resolve(
        UpdateBannerPriorityService,
      );

      await updateBannerPriorityService.execute({
        bannerId,
        priority: Number(priority),
      });

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { BannersPriorityController };
