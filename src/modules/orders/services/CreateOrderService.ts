import CreatePagarmeCardService from '@modules/payments/pagarme/services/CreatePagarmeCardService';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepositories';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import { StockActionEnum } from '../../../../prisma/generated/postgres';
import { StocksStatusEnum } from '../../../../prisma/generated/postgres';
import { StatusOrderEnum } from '../../../../prisma/generated/postgres';
import { INewOrder } from '../dtos/INewOrder';
import { Order } from '../infra/typeprisma/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

type IRequest = {
  user_id: string;
  installments: number;
  token: string;
  payment_method_id: string;
  products: INewOrder[];
  freight: number;
};

export type IMeProductPagarme = {
  subtotal: number;
  product_id: string;
  quantity: number;
  price_id: string;
  user_id: string;
};

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    user_id,
    installments,
    token,
    payment_method_id,
    products,
    freight,
  }: IRequest): Promise<Order> {
    try {
      console.log(
        'Estou com sorte',
        user_id,
        installments,
        token,
        payment_method_id,
        products,
        freight,
      );
      const createPagarmeCard = container.resolve(CreatePagarmeCardService);

      const userExists = await this.usersRepository.findByIdAllData(user_id);

      if (!userExists) {
        throw new AppError('There not find any user with the givan id');
      }

      const productIds = products.map(product => product.product_id);

      const existentProducts = await this.productsRepository.findByIds(
        productIds,
      );

      if (!existentProducts.length) {
        throw new AppError('Could not find product with the ids');
      }

      const productExistsIds = existentProducts.map(product => product.id);

      console.log('Etouououou 1', productExistsIds);
      //verifica quais os id que não existem
      const checkInexistentProducts = products.filter(
        product => !productExistsIds.includes(product.product_id),
      );
      console.log('Etouououou 2');
      //se retornar alguma valor esse produto não existe no db
      if (checkInexistentProducts.length) {
        throw new AppError(
          `Could not find product ${checkInexistentProducts[0].product_id}`,
        );
      }

      const stockProductExistsIds =
        await this.productsRepository.findGetStockByProducts(products);

      console.log(
        'Etouououou 3',
        JSON.stringify(stockProductExistsIds, null, 2),
      );
      if (!stockProductExistsIds?.length) {
        throw new AppError(`Could not find product `);
      }

      const findProductsWithNoQuantity = products.filter((item: INewOrder) => {
        return (
          stockProductExistsIds.filter(p => p.product_id === item.product_id)[0]
            .stock < item.amount
        );
      });

      console.log('Etouououou 4');
      if (findProductsWithNoQuantity.length) {
        throw new AppError(
          `The quantity ${findProductsWithNoQuantity[0].amount}
        is not available for
        ${findProductsWithNoQuantity[0].product_id} `,
        );
      }

      //AQUI FAZER O PAGAMETO COM O GATE

      //searlizar para salva na bdd

      console.log('Quantidade de produtos do cliente:', products);
      console.log('==>:', JSON.stringify(existentProducts, null, 2));

      const serializadProducts = products.map(newProduct => {
        const oldProduct = existentProducts.filter(
          p => p.id === newProduct.product_id,
        )[0];

        //preço não pode ser editado já mais
        //sempre criar um novo price

        const subtotal =
          oldProduct.price.price_promotion > 0
            ? oldProduct.price.price_promotion * newProduct.amount
            : oldProduct.price.price * newProduct.amount;

        console.log('subtotal::', subtotal);

        return {
          subtotal,
          product_id: oldProduct.id,
          quantity: newProduct.amount,
          price_id: oldProduct.price.id,
          user_id,
        };
      });

      console.log(
        'serializadProducts::',
        JSON.stringify(serializadProducts, null, 2),
      );

      const total = serializadProducts.reduce((totalsum, item) => {
        return totalsum + item.subtotal;
      }, 0);

      const serializadProductsPagarme = products.map(newProduct => {
        const oldProduct = existentProducts.filter(
          p => p.id === newProduct.product_id,
        )[0];

        return {
          id: oldProduct.id,
          tangible: true,
          title: oldProduct.subcategory.name,
          quantity: newProduct.amount,
          unit_price:
            oldProduct.price.price_promotion > 0
              ? parseInt(String(oldProduct.price.price_promotion * 100), 10)
              : parseInt(String(oldProduct.price.price * 100), 10),
        };
      });

      const newOrder = await this.ordersRepository.create({
        user_id: userExists.id,
        serializableProducts: serializadProducts,
        total: total + freight,
        status: StatusOrderEnum.AWAITING,
        freight,
      });

      console.log('Estou no service pagamento =>>> Find', newOrder);
      const { id: order_id } = newOrder;

      //update stock
      const orderedProductsQuantity = products.map(product => ({
        product_id: product.product_id,
        stock: product.amount,
        action: StockActionEnum.SALE,
        status: StocksStatusEnum.STOCK_OUT,
      }));

      console.log(
        'serializadProducts:',
        JSON.stringify(serializadProductsPagarme, null, 2),
      );

      await this.stocksRepository.createList(orderedProductsQuantity);

      console.log('vai iniciar o createPagarmeCard');

      const pagarmeCreate = await createPagarmeCard.execute({
        order_id,
        fee: 100,
        card_hash: token,
        userExists,
        products: serializadProductsPagarme,
        user_id,
        installments: String(installments),
        total: total + 100,
      });

      console.log('vai iniciar o passou:', pagarmeCreate);

      const { transaction_id, status, brand, authorized_amount } =
        pagarmeCreate;

      //criate transaction

      await this.transactionsRepository.create({
        transaction_id,
        status,
        authorization_code: 'authorization_code',
        authorized_amount: Number(authorized_amount),
        brand,
        tid: 'tid',
        installments: '1',
        order_id,
      });

      /*this.actionsOrdersRepository.create({
        order: newOrder,
        status: Status.AWAITING,
      });*/

      return newOrder;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { CreateOrderService };
