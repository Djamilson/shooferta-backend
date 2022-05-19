import BannersRepository from '@modules/banners/infra/typeprisma/repositories/BannersRepository';
import { IBannersRepository } from '@modules/banners/repositories/IBannersRepository';
import { CategoriesRepository } from '@modules/categories/infra/typeprisma/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import PageAccessesCounterRepository from '@modules/countsClicks/pageAccessesCounter/infra/typeprisma/repositories/PageAccessesCounterRepository';
import IPageAccessesCounterRepository from '@modules/countsClicks/pageAccessesCounter/repositories/IPageAccessesCounterRepository';
import ForgottenCartsRepository from '@modules/forgottenCarts/infra/typeprisma/repositories/ForgottenCartsRepository';
import IForgottenCartsRepository from '@modules/forgottenCarts/repositories/IForgottenCartsRepository';
import OrdersProductsRepository from '@modules/orders/infra/typeprisma/repositories/OrdersProductsRepository';
import OrdersRepository from '@modules/orders/infra/typeprisma/repositories/OrdersRepository';
import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import PoliticsRepository from '@modules/politics/infra/typeprisma/repositories/PoliticsRepository';
import { IPoliticsRepository } from '@modules/politics/repositories/IPoliticsRepository';
import PricesRepository from '@modules/prices/infra/typeprisma/repositories/PricesRepository';
import IPricesRepository from '@modules/prices/repositories/IPricesRepository';
import { CategoriesProductsRepository } from '@modules/products/infra/typeprisma/repositories/CategoriesProductsRepository';
import { DescriptionsRepository } from '@modules/products/infra/typeprisma/repositories/DescriptionsRepository';
import { PhotosRepository } from '@modules/products/infra/typeprisma/repositories/PhotosRepository';
import { ProductsRepository } from '@modules/products/infra/typeprisma/repositories/ProductsRepository';
import { ICategoriesProductsRepository } from '@modules/products/repositories/ICategoriesProductsRepository';
import { IDescriptionsRepository } from '@modules/products/repositories/IDescriptionsRepository';
import { IPhotosRepository } from '@modules/products/repositories/IPhotosRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import ProductsInfoRepository from '@modules/productsInfo/infra/typeprisma/repositories/ProductsInfoRepository';
import IProductsInfoRepository from '@modules/productsInfo/repositories/IProductsInfoRepository';
import RefreshesTokensRepository from '@modules/refreshesTokens/infra/typeprisma/RefreshesTokensRepository';
import IRefreshesTokensRepository from '@modules/refreshesTokens/repositories/IRefreshesTokensRepository';
import { StocksRepository } from '@modules/stocks/infra/typeprisma/repositories/StocksRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepositories';
import { SubCategoriesRepository } from '@modules/subcategories/infra/typeprisma/repositories/SubCategoriesRepository';
import { ISubCategoriesRepository } from '@modules/subcategories/repositories/ISubCategoriesRepository';
import TransactionsRepository from '@modules/transactions/infra/typeprisma/repositories/TransactionsRepository';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import AddressesRepository from '@modules/users/infra/typeprisma/repositories/AddressesRepository';
import ForgotTokensRepository from '@modules/users/infra/typeprisma/repositories/ForgotTokensRepository';
import GroupsRepository from '@modules/users/infra/typeprisma/repositories/GroupsRepository';
import PersonsRepository from '@modules/users/infra/typeprisma/repositories/PersonsRepository';
import PhonesRepository from '@modules/users/infra/typeprisma/repositories/PhoneRepository';
import UsersGroupsRepository from '@modules/users/infra/typeprisma/repositories/UsersGroupsRepository';
import UsersRepository from '@modules/users/infra/typeprisma/repositories/UsersRepository';
import '@modules/users/providers';
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import IForgotTokensRepository from '@modules/users/repositories/IForgotTokensRepository';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';
import IUsersGroupsRepository from '@modules/users/repositories/IUsersGroupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';
import './providers';
import { IDateProvider } from './providers/DateProvider/IDateProvider';
import DayjsDateProvider from './providers/DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
);

container.registerSingleton<IUsersGroupsRepository>(
  'UsersGroupsRepository',
  UsersGroupsRepository,
);

container.registerSingleton<IForgottenCartsRepository>(
  'ForgottenCartsRepository',
  ForgottenCartsRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IRefreshesTokensRepository>(
  'RefreshesTokensRepository',
  RefreshesTokensRepository,
);

container.registerSingleton<IForgotTokensRepository>(
  'ForgotTokensRepository',
  ForgotTokensRepository,
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISubCategoriesRepository>(
  'SubCategoriesRepository',
  SubCategoriesRepository,
);

container.registerSingleton<IBannersRepository>(
  'BannersRepository',
  BannersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IPricesRepository>(
  'PricesRepository',
  PricesRepository,
);

container.registerSingleton<IDescriptionsRepository>(
  'DescriptionsRepository',
  DescriptionsRepository,
);

container.registerSingleton<IPhotosRepository>(
  'PhotosRepository',
  PhotosRepository,
);

container.registerSingleton<IPoliticsRepository>(
  'PoliticsRepository',
  PoliticsRepository,
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<ICategoriesProductsRepository>(
  'CategoriesProductsRepository',
  CategoriesProductsRepository,
);

container.registerSingleton<IProductsInfoRepository>(
  'ProductsInfoRepository',
  ProductsInfoRepository,
);

container.registerSingleton<IOrdersProductsRepository>(
  'OrdersProductsRepository',
  OrdersProductsRepository,
);

container.registerSingleton<IPageAccessesCounterRepository>(
  'PageAccessesCounterRepository',
  PageAccessesCounterRepository,
);
