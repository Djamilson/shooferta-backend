import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Price } from '../infra/typeprisma/entities/Price';
import IPricesRepository from '../repositories/IPricesRepository';

interface IResponse {
  price: number;
  price_promotion: number;
  product_id: string;
  user_id: string;
}

@injectable()
class CreatePriceService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    price,
    product_id,
    user_id,
    price_promotion,
  }: IResponse): Promise<Price> {
    const checkProductExists = await this.productsRepository.findById(
      product_id,
    );

    if (!checkProductExists) {
      throw new AppError('Product not exist .', 401);
    }

    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not exist.', 401);
    }

    const newPrice = await this.pricesRepository.create({
      price,
      product_id,
      user_id: checkUserExists.id,
      price_promotion,
    });

    await this.productsRepository.update({
      id: product_id,
      updateData: { price_id: newPrice.id },
    });

    return newPrice;
  }
}

export default CreatePriceService;
