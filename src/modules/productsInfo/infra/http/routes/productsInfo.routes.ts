import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProductsInfoController from '../controllers/ProductsInfoController';

const productsInfoRouter = Router();

const productsInfoController = new ProductsInfoController();

productsInfoRouter.use(ensureAuthenticated);

productsInfoRouter.get(
  '/:productInfoId',
  celebrate({
    [Segments.PARAMS]: {
      productInfoId: Joi.string().uuid().required(),
    },
  }),
  productsInfoController.show,
);

productsInfoRouter.put(
  '/:productInfoId',
  celebrate({
    [Segments.PARAMS]: {
      productInfoId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      price: Joi.number().required(),
      price_promotion: Joi.number().required(),
      link: Joi.string().required(),
      freight: Joi.number().required(),
      stock: Joi.number().required(),
      company: Joi.string().required(),
      currency: Joi.string().required(),
    },
  }),
  productsInfoController.update,
);

export default productsInfoRouter;
