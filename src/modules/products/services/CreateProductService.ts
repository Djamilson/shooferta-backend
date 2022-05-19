import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { ISubCategoriesRepository } from '@modules/subcategories/repositories/ISubCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import {
  StockActionEnum,
  StocksStatusEnum,
} from '@shared/infra/prisma/postgres/generated/postgres';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/typeprisma/entities/Product';
import { IDescriptionsRepository } from '../repositories/IDescriptionsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

type IRequest = {
  user_id: string;
  sku: string;
  bar_code: string;
  price: number;
  price_promotion: number;
  other: object;

  category_id: string;
  description_id: string;
  subcategory_id: string;

  productInfo: {
    price: number;
    price_promotion: number;
    link: string;
    freight: number;
    company: string;
    currency: string;
    stock: number;
  };
};

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('DescriptionsRepository')
    private descriptionsRepository: IDescriptionsRepository,

    @inject('SubCategoriesRepository')
    private subCategoriesRepository: ISubCategoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    sku,
    bar_code,
    other,
    price,
    price_promotion,
    category_id,
    description_id,
    subcategory_id,
    productInfo,
  }: IRequest): Promise<Product> {
    try {
      const checkProductExists = await this.productsRepository.findBySku(sku);

      if (checkProductExists) {
        throw new AppError('Product already used. SKU', 401);
      }

      if (bar_code !== '' && bar_code !== null && bar_code !== undefined) {
        const oldProduct = await this.productsRepository.findByBarCode(
          bar_code,
        );

        if (oldProduct && oldProduct.bar_code === bar_code) {
          throw new AppError('Product already in use.', 402);
        }
      }

      const categoryExists = await this.categoriesRepository.findById(
        category_id,
      );

      if (!categoryExists) {
        throw new AppError('Category not exist', 403);
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

      const product = await this.productsRepository.createProductByPrice({
        user_id,
        category_id: categoryExists.id,
        product: {
          sku,
          bar_code,
          other,
          description_id,
          subcategory_id,
        },
        price: { price, price_promotion },
        stock: {
          stock: productInfo.stock,
          action: StockActionEnum.ACQUISITION,
          status: StocksStatusEnum.STOCK_IN,
        },
        productInfo: {
          price: productInfo.price,
          price_promotion: productInfo.price,
          link: productInfo.link,
          freight: productInfo.freight,
          company: productInfo.company,
          currency: productInfo.currency,
          stock: productInfo.stock,
        },
      });

      const cachekey = `products:`;

      await this.cacheProvider.invalidatePrefix(cachekey);

      return product;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreateProductService };
