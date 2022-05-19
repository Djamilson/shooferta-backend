import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../infra/typeprisma/entities/ProductInfo';
import IProductsInfoRepository from '../repositories/IProductsInfoRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListProductInfoByIdService {
  constructor(
    @inject('ProductsInfoRepository')
    private productsInfoRepository: IProductsInfoRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ProductInfo | undefined> {
    try {
      const productInfo = await this.productsInfoRepository.findById(id);

      if (!productInfo) {
        return undefined;
      }

      return productInfo;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListProductInfoByIdService };
