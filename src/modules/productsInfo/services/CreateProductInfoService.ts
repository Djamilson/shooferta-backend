import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../infra/typeprisma/entities/ProductInfo';
import IProductsInfoRepository from '../repositories/IProductsInfoRepository';

interface IResponse {
  price: number;
  user_id: string;
  price_promotion: number;
  product_id: string;
  link: string;
  freight: number;
  company: string;
  currency: string;
  stock: number;
}

@injectable()
class CreateProductInfoService {
  constructor(
    @inject('ProductsInfoRepository')
    private productsInfoRepository: IProductsInfoRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    price,
    user_id,
    price_promotion,
    product_id,
    link,
    freight,
    company,
    currency,
    stock,
  }: IResponse): Promise<ProductInfo> {
    const checkProductExists = await this.productsRepository.findById(
      product_id,
    );

    if (!checkProductExists) {
      throw new AppError('Product not exist .', 401);
    }

    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not cad company exist.', 401);
    }

    const newProductInfo = await this.productsInfoRepository.create({
      price,
      product_id,
      user_id: checkUserExists.id,
      price_promotion,
      link,
      freight,
      company,
      currency,
      stock,
    });

    checkProductExists.product_info = newProductInfo;

    this.productsRepository.update({
      id: checkProductExists.id,
      updateData: newProductInfo,
    });

    return newProductInfo;
  }
}

export default CreateProductInfoService;
