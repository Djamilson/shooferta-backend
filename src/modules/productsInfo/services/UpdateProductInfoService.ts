import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../infra/typeprisma/entities/ProductInfo';
import IProductsInfoRepository from '../repositories/IProductsInfoRepository';

interface IRequest {
  product_info_id: string;
  price: number;
  price_promotion: number;
  link: string;
  freight: number;
  company: string;
  currency: number;
  stock: number;
}

@injectable()
class UpdateProductInfoService {
  constructor(
    @inject('ProductsInfoRepository')
    private productsInfoRepository: IProductsInfoRepository,
  ) {}

  public async execute({
    price,
    stock,
    product_info_id,
    price_promotion,
    link,
    freight,
    company,
    currency,
  }: IRequest): Promise<ProductInfo> {
    try {
      const newProductInfo = await this.productsInfoRepository.findById(
        product_info_id,
      );

      if (!newProductInfo) {
        throw new AppError('Not exist price.', 401);
      }

      console.log(
        price,
        stock,
        product_info_id,
        price_promotion,
        link,
        freight,
        company,
        currency,
      );

      return this.productsInfoRepository.update({
        id: product_info_id,
        updateData: {
          price,
          price_promotion,
          link,
          freight,
          company,
          currency,
          stock,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateProductInfoService };
