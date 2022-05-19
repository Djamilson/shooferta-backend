import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IForgottenCartsRepository from '../repositories/IForgottenCartsRepository';

interface IRequest {
  product_id: string;
  user_id: string;
  amount: number;
}
@injectable()
class CreateForgottenCartService {
  constructor(
    @inject('ForgottenCartsRepository')
    private forgottenCartsRepository: IForgottenCartsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    user_id,
    amount,
  }: IRequest): Promise<void> {
    try {

      console.log("product_id    user_id    amount",product_id, user_id, amount);
      const checkProductExists = await this.productsRepository.findById(
        product_id,
      );

      if (!checkProductExists) {
        throw new AppError('Product does not exists.', 401);
      }

      const checkForgottenCartExists =
        await this.forgottenCartsRepository.findByUserIdByProductId({
          product_id,
          user_id,
        });

      if (checkForgottenCartExists && amount > 0) {
        checkForgottenCartExists.amount = amount;

        await this.forgottenCartsRepository.update({
          id: checkForgottenCartExists.id,
          updateData: {
            amount,
          },
        });
      } else if (checkForgottenCartExists && amount < 1) {
        await this.forgottenCartsRepository.delete(checkForgottenCartExists.id);
      } else {
        await this.forgottenCartsRepository.create({
          user_id,
          product_id,
          amount: 1,
        });
      }
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreateForgottenCartService };
