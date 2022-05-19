import { UpdateBannerPhotoService } from '@modules/banners/services/UpdateBannerNameService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BannersNameController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { bannerId } = req.params;

    const updateBannerPhoto = container.resolve(UpdateBannerPhotoService);

    const banner = await updateBannerPhoto.execute({
      id: bannerId,
      photoFilename: req.file?.filename,
    });

    return res.json(banner);
  }
}

export { BannersNameController };
