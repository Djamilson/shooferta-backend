import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgottenCartsController from '../controller/ForgottenCartsController';

const forgottenCartsRouter = Router();

const forgottenCartsController = new ForgottenCartsController();

//not logged

forgottenCartsRouter.use(ensureAuthenticated);

// => /forgotten/carts

forgottenCartsRouter.get('/', forgottenCartsController.index);

forgottenCartsRouter.get('/destroy', forgottenCartsController.destroy);


forgottenCartsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      amount: Joi.number().required(),
    },
  }),
  forgottenCartsController.create,
);

forgottenCartsRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      amount: Joi.number().required(),
    },
  }),
  forgottenCartsController.update,
);

forgottenCartsRouter.delete(
  '/remove/item/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
  }),
  forgottenCartsController.removeItem,
);

forgottenCartsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      products: Joi.array().items(
        Joi.object().keys({
          amount: Joi.number().required(),
          product_id: Joi.string().required(),
        }),
      ),
    },
  }),
  forgottenCartsController.initial,
);

export default forgottenCartsRouter;
