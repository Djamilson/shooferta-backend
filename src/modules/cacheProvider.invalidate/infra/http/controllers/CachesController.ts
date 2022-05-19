import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvalidateCacheService } from '../../../services/InvalidateCacheService';

class CachesController {
  async invalidate(req: Request, res: Response): Promise<Response> {
    try {
      const invalidateCacheService = container.resolve(InvalidateCacheService);
      await invalidateCacheService.execute();

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { CachesController }
