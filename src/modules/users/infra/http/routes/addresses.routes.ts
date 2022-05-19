import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';
import AddressMainController from '../controllers/AddressMainController';

const addressesRouter = Router();
const addressesController = new AddressesController();
const addressMainController = new AddressMainController();

addressesRouter.use(ensureAuthenticated);

addressesRouter.get('/', addressesController.index);

addressesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      number: Joi.number().required(),
      street: Joi.string().required(),
      complement: Joi.string().optional().allow(''),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  addressesController.create,
);

addressesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      number: Joi.number().required(),
      street: Joi.string().required(),
      complement: Joi.string().optional().allow(''),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      person_id: Joi.string().uuid().required(),
    },
  }),
  addressesController.update,
);

addressesRouter.delete('/:addressId', addressesController.destroy);
addressesRouter.get('/users/addresses/', addressesController.index);
addressesRouter.get(
  '/users/addresses/:addressId',
  celebrate({
    [Segments.PARAMS]: {
      addressId: Joi.string().uuid().required(),
    },
  }),
  addressesController.show,
);

addressesRouter.put(
  '/main/addresses/:addressId',
  celebrate({
    [Segments.PARAMS]: {
      addressId: Joi.string().uuid().required(),
    },
  }),
  addressMainController.put,
);

export default addressesRouter;
