import bannersRouter from '@modules/banners/infra/http/routes/banners.routes';
import cachesRouter from '@modules/cacheProvider.invalidate/infra/http/routes/caches.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import pageAccessesCounterRouter from '@modules/countsClicks/pageAccessesCounter/infra/http/routes/page.accesses.counter.routes';
import forgottenCartsRouter from '@modules/forgottenCarts/infra/http/routes/forgotten.carts.routes';
import { freightsRouter } from '@modules/freights/infra/http/routes/freights.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import politicsRouter from '@modules/politics/infra/http/routes/politics.routes';
import pricesRouter from '@modules/prices/infra/http/routes/prices.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productsInfoRouter from '@modules/productsInfo/infra/http/routes/productsInfo.routes';
import refreshTokenRouter from '@modules/refreshesTokens/infra/http/routes/refresh.token.routes';
import { stocksRouter } from '@modules/stocks/infra/http/routes/stocks.routes';
import subCategoriesRouter from '@modules/subcategories/infra/http/routes/subCategories.routes';
import addressesRouter from '@modules/users/infra/http/routes/addresses.routes';
import groupsRouter from '@modules/users/infra/http/routes/groups.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import personsRouter from '@modules/users/infra/http/routes/persons.routes';
import phonesRouter from '@modules/users/infra/http/routes/phones.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

//web user not logon

//create account customers

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);
routes.use('/refresh', refreshTokenRouter);
routes.use('/groups', groupsRouter);

routes.use('/addresses', addressesRouter);
routes.use('/phones', phonesRouter);
routes.use('/persons', personsRouter);

routes.use('/passwords', passwordsRouter);

routes.use('/categories', categoriesRouter);

routes.use('/subcategories', subCategoriesRouter);
routes.use('/banners', bannersRouter);

routes.use('/products', productsRouter);
routes.use('/stocks', stocksRouter);
routes.use('/products/info', productsInfoRouter);
routes.use('/prices', pricesRouter);
routes.use('/politics', politicsRouter);
routes.use('/orders', ordersRouter);
routes.use('/freights', freightsRouter);

routes.use('/pages/accesses/counter', pageAccessesCounterRouter);

routes.use('/forgotten/carts', forgottenCartsRouter);

routes.use('/caches', cachesRouter);

export default routes;
