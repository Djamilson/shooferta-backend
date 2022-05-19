import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IForgottenCartsRepository from '../repositories/IForgottenCartsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class DestroyForgottenCartService {
  constructor(
    @inject('ForgottenCartsRepository')
    private forgottenCartsRepository: IForgottenCartsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    try {
      const checkForgottenCartExists =
        await this.forgottenCartsRepository.allForgottenCarts(user_id);

      if (!checkForgottenCartExists) {
        return;
      }

      const ids = checkForgottenCartExists.map(p => String(p.id));

      await this.forgottenCartsRepository.deleteAll(ids);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { DestroyForgottenCartService };
