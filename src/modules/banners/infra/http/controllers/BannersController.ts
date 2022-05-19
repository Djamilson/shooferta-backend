import { CreateBannerService } from '@modules/banners/services/CreateBannerService';
import { ListBannerByIdService } from '@modules/banners/services/ListBannerByIdService';
import { ListBannersService } from '@modules/banners/services/ListBannersService';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Banner } from '../../typeprisma/entities/Banner';

export default class BannersController {
  async show(request: Request, response: Response): Promise<Response> {
    const listBannerById = container.resolve(ListBannerByIdService);

    const banner_id = request.params.bannerId;

    const banner = await listBannerById.execute(banner_id);

    return response.status(200).json(plainToInstance(Banner, banner));
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listBanners = container.resolve(ListBannersService);
      const banners = await listBanners.execute();

      return res.status(200).json(plainToInstance(Banner, banners));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { type } = req.body;

      const createBanner = container.resolve(CreateBannerService);

      const banner = await createBanner.execute({
        name: req.file!.filename,
        type,
      });
      return res.json(instanceToPlain(banner));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
