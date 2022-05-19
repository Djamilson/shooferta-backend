import { Category } from '@modules/categories/infra/typeprisma/entities/Category';
import AppError from '@shared/errors/AppError';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../repositories/IProductsRepository';

type IProps = {
  product_id: string;
};

@injectable()
class ListCategoriesProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ product_id }: IProps): Promise<any> {
    try {
      const checkCategoryProductExists = await this.productsRepository.findById(
        product_id,
      );

      if (!checkCategoryProductExists) {
        throw new AppError('CategoryProduct does not exists.', 401);
      }

      const serializable = checkCategoryProductExists.categories?.map(
        p => p.category,
      );

      return plainToInstance(Category, serializable);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { ListCategoriesProductsService };
