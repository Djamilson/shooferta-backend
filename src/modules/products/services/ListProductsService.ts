import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/typeprisma/entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';


@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<any> {
    const list = await this.productsRepository.allProducts();

    return list;
  }
}

export { ListProductsService };
