import { ICreateProductInfoDTO } from '@modules/productsInfo/dtos/ICreateProductInfoDTO';
import IProductsInfoRepository from '@modules/productsInfo/repositories/IProductsInfoRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { ProductInfo } from '../entities/ProductInfo';

class ProductsInfoRepository implements IProductsInfoRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async allProductInfos(): Promise<ProductInfo[] | null> {
    const productInfos = await this.prismaRepository.productInfo.findMany({});
    return productInfos as unknown as ProductInfo[];
  }

  public async findById(id: string): Promise<ProductInfo | null> {
    const productInfo = await this.prismaRepository.productInfo.findUnique({
      where: { id },
    });
    return productInfo as unknown as ProductInfo;
  }

  public async create(data: ICreateProductInfoDTO): Promise<ProductInfo> {
    return this.prismaRepository.productInfo.create({
      data,
    }) as unknown as ProductInfo;
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<ProductInfo> {
    const productInfo = await this.prismaRepository.productInfo.update({
      where: {
        id,
      },
      data: updateData,
    });
    return productInfo as unknown as ProductInfo;
  }

  public async delete(id: string): Promise<ProductInfo> {
    const productInfo = await this.prismaRepository.productInfo.delete({
      where: {
        id,
      },
    });
    return productInfo as unknown as ProductInfo;
  }
}

export default ProductsInfoRepository;
