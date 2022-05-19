import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { StocksController } from '@modules/stocks/infra/http/controllers/StocksController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { StocksProductIdController } from '@modules/stocks/infra/http/controllers/StocksProductIdController';

const stocksRouter = Router();
const stocksController = new StocksController();
const stocksProductIdController = new StocksProductIdController();

//not logged

stocksRouter.get(
  '/products/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
  }),
  stocksProductIdController.index,
);

// logged
stocksRouter.use(ensureAuthenticated);

stocksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      stock: Joi.string().required(),
      action: Joi.string().required(),
      status: Joi.string().required(),
      product_id: Joi.string().uuid().required(),
    },
  }),
  stocksController.create,
);

export { stocksRouter };
