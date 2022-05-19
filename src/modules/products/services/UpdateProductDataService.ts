import { ISubCategoriesRepository } from '@modules/subcategories/repositories/ISubCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/typeprisma/entities/Product';
import { IDescriptionsRepository } from '../repositories/IDescriptionsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

type IRequest = {
  product_id: string;
  sku: string;
  bar_code: string;
  description_id: string;
  subcategory_id: string;
};

@injectable()
class UpdateProductDataService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('DescriptionsRepository')
    private descriptionsRepository: IDescriptionsRepository,

    @inject('SubCategoriesRepository')
    private subCategoriesRepository: ISubCategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    sku,
    bar_code,
    description_id,
    subcategory_id,
  }: IRequest): Promise<Product | string> {
    try {
      const checkProductExists = await this.productsRepository.findById(
        product_id,
      );

      if (!checkProductExists) {
        throw new AppError('Product not exists', 401);
      }

      const productWithUpdatedSku = await this.productsRepository.findBySku(
        sku,
      );

      if (productWithUpdatedSku && productWithUpdatedSku.id !== product_id) {
        throw new AppError('SKU already in use.', 402);
      }

      if (bar_code !== '' && bar_code !== null && bar_code !== undefined) {
        const oldProduct = await this.productsRepository.findByBarCode(
          bar_code,
        );

        if (oldProduct && oldProduct.id !== product_id) {
          throw new AppError('Product already in barcode use.', 403);
        }
      }

      const subCategoryExists = await this.subCategoriesRepository.findById(
        subcategory_id,
      );

      if (!subCategoryExists) {
        throw new AppError('SubCategory not exist', 404);
      }

      const descriptionExists = await this.descriptionsRepository.findById(
        description_id,
      );

      if (!descriptionExists) {
        throw new AppError('Description not exist', 404);
      }

      const product = await this.productsRepository.update({
        id: product_id,
        updateData: {
          sku,
          bar_code,
          description_id,
          subcategory_id,
        },
      });

      const cachekey = `products`;
      const cachekeyProduct = `product:${product_id}`;

      await this.cacheProvider.invalidate(cachekeyProduct);
      await this.cacheProvider.invalidatePrefix(cachekey);

      return product;
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateProductDataService };
