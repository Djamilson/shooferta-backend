import { INewOrder } from '@modules/orders/dtos/INewOrder';
import { IStockProduct } from '@modules/stocks/dtos/IStockProduct';
import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreateProductDTO } from '../dtos/ICreateDTO';
import ISearchDTO from '../dtos/ISearchDTO';
import ITotalProductsDTO from '../dtos/ITotalProductsDTO';
import { Product } from '../infra/typeprisma/entities/Product';

interface IProductsRepository {
  findProductToDescription(date: ISearchDTO): Promise<ITotalProductsDTO>;
  findBySku(sku: string): Promise<Product | null>;
  findByBarCode(bar_code: string): Promise<Product | null>;
  findByIds(ids: string[]): Promise<Product[]>;

  findDetailsProductByProductId(id: string): Promise<Product | null>;

  findGetStockByProducts(
    products: INewOrder[],
  ): Promise<IStockProduct[] | null>;

  allProducts(): Promise<Product[] | null>;
  findById(id: string): Promise<Product | null>;
  //findByIdMeCategories (id: string): Promise<Product | null>;

  createProductByPrice(data: ICreateProductDTO): Promise<Product>;
  //create(data: ICreateDTO): Promise<Product | void>;
  update({ id, updateData }: IPropsUpdateData): Promise<Product>;
}

export { IProductsRepository };
