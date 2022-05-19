import { UpdateBannerTypeService } from '@modules/banners/services/UpdateBannerTypeService';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Banner } from '../../typeprisma/entities/Banner';

class UpdateTypeBannersController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { bannerId } = req.params;

      const { type } = req.body;

      const updateCategory = container.resolve(UpdateBannerTypeService);

      const banner = await updateCategory.execute({
        id: bannerId,
        type,
      });
      return res.json(plainToInstance(Banner, banner));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { UpdateTypeBannersController };
