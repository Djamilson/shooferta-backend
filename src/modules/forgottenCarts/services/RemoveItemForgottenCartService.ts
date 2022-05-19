import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IForgottenCartsRepository from '../repositories/IForgottenCartsRepository';
import { IUserIdByProductId } from './../repositories/IForgottenCartsRepository';

@injectable()
class RemoveItemForgottenCartService {
  constructor(
    @inject('ForgottenCartsRepository')
    private forgottenCartsRepository: IForgottenCartsRepository,
  ) {}

  public async execute({
    user_id,
    product_id,
  }: IUserIdByProductId): Promise<void> {
    try {
      const checkForgottenCartExists =
        await this.forgottenCartsRepository.findByUserIdByProductId({
          user_id,
          product_id,
        });

      if (!checkForgottenCartExists) {
        return;
      }

      await this.forgottenCartsRepository.delete(checkForgottenCartExists.id);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { RemoveItemForgottenCartService };
