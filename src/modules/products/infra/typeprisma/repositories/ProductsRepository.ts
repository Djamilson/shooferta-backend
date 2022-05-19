import { INewOrder } from '@modules/orders/dtos/INewOrder';
import { Price } from '@modules/prices/infra/typeprisma/entities/Price';
import { ICreateProductDTO } from '@modules/products/dtos/ICreateDTO';
import ISearchDTO from '@modules/products/dtos/ISearchDTO';
import ITotalProductsDTO from '@modules/products/dtos/ITotalProductsDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IStockProduct } from '@modules/stocks/dtos/IStockProduct';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { StocksStatusEnum } from '../../../../../../prisma/generated/postgres';
import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  async totalRegister(data: ISearchDTO): Promise<number> {
    const { query, status } = data;

    const result = await this.prismaRepository.product.count({
      where: {
        status,
        AND: {
          description: {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      },
    });

    return result;
  }

  public async findProductToDescription(
    data: ISearchDTO,
  ): Promise<ITotalProductsDTO> {
    const { page, pageSize, query, status } = data;

    let products = [] as Product[];

    const total = await this.totalRegister(data);

    if (total > 0) {
      products = (await this.prismaRepository.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          status,
          AND: {
            description: {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
        select: {
          id: true,
          sku: true,
          other: true,
          status_freight: true,
          status_product: true,
          bar_code: true,

          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },

          price: {
            select: {
              id: true,
              price: true,
              price_promotion: true,
            },
          },
          status: true,

          subcategory: {
            select: {
              id: true,
              name: true,
            },
          },
          description: {
            select: {
              id: true,
              description: true,
            },
          },

          product_info: {
            select: {
              id: true,
              company: true,
              currency: true,
              freight: true,
              link: true,
              price: true,
              price_promotion: true,
              stock: true,
            },
          },

          photos: {
            select: {
              id: true,
              name: true,
              priority: true,
              product_id: true,
            },
          },
        },
        orderBy: {
          description: {
            description: 'asc',
          },
        },
      })) as unknown as Product[];
    }

    return {
      result: products,
      total,
    };
  }

  public async findGetStockByProducts(
    products: INewOrder[],
  ): Promise<IStockProduct[] | null> {
    const promises = products.map(async product => {
      const totalSTOCKIN = await this.prismaRepository.stock.aggregate({
        where: {
          product_id: product.product_id,
          status: {
            equals: StocksStatusEnum.STOCK_IN,
          },
        },
        _sum: {
          stock: true,
        },
      });

      const totalSTOCKOUT = await this.prismaRepository.stock.aggregate({
        where: {
          product_id: product.product_id,
          status: {
            equals: StocksStatusEnum.STOCK_OUT,
          },
        },
        _sum: {
          stock: true,
        },
      });

      const sumSTOCKIN =
        (totalSTOCKIN._sum?.stock && totalSTOCKIN?._sum?.stock) || 0;

      const sumSTOCKOUT =
        (totalSTOCKOUT._sum?.stock && totalSTOCKOUT?._sum?.stock) || 0;

      return {
        stock: Number(sumSTOCKIN - sumSTOCKOUT),
        product_id: product.product_id,
      };
    });

    const stockProducts = await Promise.all(promises);

    return stockProducts;
  }

  public async findByIds(ids: string[]): Promise<Product[]> {
    const products = await this.prismaRepository.product.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        sku: true,
        other: true,
        status_freight: true,
        status_product: true,
        bar_code: true,

        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                slug: true,
                photo: true,
              },
            },
          },
        },

        price: {
          select: {
            id: true,
            price: true,
            price_promotion: true,
          },
        },
        status: true,

        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        description: {
          select: {
            id: true,
            description: true,
          },
        },

        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },

        photos: {
          select: {
            id: true,
            name: true,
            priority: true,
            product_id: true,
          },
        },
      },
    });
    return products as unknown as Product[];
  }

  public async findDetailsProductByProductId(
    id: string,
  ): Promise<Product | null> {
    const product = await this.prismaRepository.product.findUnique({
      where: { id },
      select: {
        id: true,
        sku: true,
        other: true,
        status_freight: true,
        status_product: true,
        bar_code: true,

        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                slug: true,
                photo: true,
              },
            },
          },
        },

        price: {
          select: {
            id: true,
            price: true,
            price_promotion: true,
          },
        },
        status: true,

        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        description: {
          select: {
            id: true,
            description: true,
          },
        },

        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },

        photos: {
          select: {
            id: true,
            name: true,
            priority: true,
            product_id: true,
          },
        },
      },
    });
    return product as unknown as Product;
  }

  public async findBySku(sku: string): Promise<Product | null> {
    const product = await this.prismaRepository.product.findFirst({
      where: { sku },
      select: {
        id: true,
        sku: true,
        other: true,
        status_freight: true,
        status_product: true,
        bar_code: true,

        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                slug: true,
                photo: true,
              },
            },
          },
        },

        price: {
          select: {
            id: true,
            price: true,
            price_promotion: true,
          },
        },
        status: true,

        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        description: {
          select: {
            id: true,
            description: true,
          },
        },

        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },

        photos: {
          select: {
            id: true,
            name: true,
            priority: true,
            product_id: true,
          },
        },
      },
    });
    return product as unknown as Product;
  }

  public async findByBarCode(bar_code: string): Promise<Product | null> {
    const product = await this.prismaRepository.product.findFirst({
      where: { bar_code },
      select: {
        id: true,
        sku: true,
        other: true,
        status_freight: true,
        status_product: true,
        bar_code: true,

        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                slug: true,
                photo: true,
              },
            },
          },
        },

        price: {
          select: {
            id: true,
            price: true,
            price_promotion: true,
          },
        },
        status: true,

        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        description: {
          select: {
            id: true,
            description: true,
          },
        },

        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },

        photos: {
          select: {
            id: true,
            name: true,
            priority: true,
            product_id: true,
          },
        },
      },
    });
    return product as unknown as Product;
  }

  public async allProducts(): Promise<Product[] | null> {
    const products = await this.prismaRepository.product.findMany({
      select: {
        id: true,
        sku: true,
        other: true,
        status_freight: true,
        status_product: true,
        bar_code: true,

        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                slug: true,
                photo: true,
              },
            },
          },
        },

        price: {
          select: {
            id: true,
            price: true,
            price_promotion: true,
          },
        },
        status: true,

        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        description: {
          select: {
            id: true,
            description: true,
          },
        },

        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },

        photos: {
          select: {
            id: true,
            name: true,
            priority: true,
            product_id: true,
          },
        },
      },
    });
    return products as unknown as Product[];
  }

  public async findById(id: string): Promise<Product | null> {
    const product = await this.prismaRepository.product.findUnique({
      where: { id },
      select: {
        id: true,
        sku: true,
        other: true,
        status_freight: true,
        status_product: true,
        bar_code: true,

        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                slug: true,
                photo: true,
              },
            },
          },
        },

        price: {
          select: {
            id: true,
            price: true,
            price_promotion: true,
          },
        },
        status: true,

        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        description: {
          select: {
            id: true,
            description: true,
          },
        },

        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },

        photos: {
          select: {
            id: true,
            name: true,
            priority: true,
            product_id: true,
          },
        },
      },
    });
    return product as unknown as Product;
  }

  public async createProductByPrice({
    user_id,
    category_id,
    product,
    price,
    stock,
    productInfo,
  }: ICreateProductDTO): Promise<Product> {
    const { description_id, subcategory_id, ...restProduct } = product;

    const mePrice = (await this.prismaRepository.price.create({
      data: {
        ...price,
        user: {
          connect: { id: user_id },
        },
        product: {
          create: {
            ...restProduct,
            description: {
              connect: {
                id: description_id,
              },
            },

            subcategory: {
              connect: {
                id: subcategory_id,
              },
            },

            product_info: {
              create: {
                ...productInfo,
                user: {
                  connect: {
                    id: user_id,
                  },
                },
              },
            },
            stocks: {
              create: {
                ...stock,
              },
            },
            categories: {
              createMany: {
                data: {
                  category_id,
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        product: true,
      },
    })) as unknown as Price;

    const newProduct = await this.prismaRepository.product.update({
      where: {
        id: mePrice.product.id,
      },
      data: {
        price: {
          connect: {
            id: mePrice.id,
          },
        },
      },
      select: {
        id: true,
        price: true,
        bar_code: true,
        description: {
          select: {
            id: true,
            description: true,
          },
        },
        product_info: {
          select: {
            id: true,
            company: true,
            currency: true,
            freight: true,
            link: true,
            price: true,
            price_promotion: true,
            stock: true,
          },
        },
        other: true,
        sku: true,
      },
    });

    return newProduct as unknown as Product;
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Product> {
    const product = await this.prismaRepository.product.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return product as unknown as Product;
  }
}

export { ProductsRepository };
