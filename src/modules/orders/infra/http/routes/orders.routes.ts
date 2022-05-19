import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import OrdersController from '../controller/OrdersController';
import { OrdersListPaginationController } from '../controller/OrdersListPaginationController';
import OrdersProductsController from '../controller/OrdersProductsController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const ordersProductsController = new OrdersProductsController();

const ordersListPaginationController = new OrdersListPaginationController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', ordersController.index);

ordersRouter.get(
  '/pagination',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  ordersListPaginationController.index,
);

ordersRouter.get(
  '/:orderId',
  celebrate({
    [Segments.PARAMS]: {
      orderId: Joi.string().uuid().required(),
    },
  }),

  ordersController.show,
);

ordersRouter.post(
  '/checkouts',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      installments: Joi.number().required(),
      payment_method_id: Joi.string().required(),
      products: Joi.array().items(
        Joi.object().keys({
          amount: Joi.number().required(),
          product_id: Joi.string().required(),
        }),
      ),
      freight: Joi.number().required(),
    },
  }),
  ordersController.create,
);

ordersRouter.get(
  '/products/list/:orderId',
  celebrate({
    [Segments.PARAMS]: {
      orderId: Joi.string().uuid().required(),
    },
  }),
  ordersProductsController.show,
);

ordersRouter.patch(
  '/orders/products/:orderProductId',
  celebrate({
    [Segments.PARAMS]: {
      orderProductId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
  }),
  ordersProductsController.update,
);

export default ordersRouter;
