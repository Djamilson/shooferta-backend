import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PhoneMainController from '../controllers/PhoneMainController';
import PhonesController from '../controllers/PhonesController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticanted';

const phonesRouter = Router();
const phonesController = new PhonesController();
const phoneMainController = new PhoneMainController();

phonesRouter.use(ensureAuthenticated);

phonesRouter.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      phone: Joi.string().required(),
    },
  }),
  phonesController.create,
);

phonesRouter.get('/users', phonesController.index);
phonesRouter.get('/:phoneId', phonesController.show);
phonesRouter.delete('/:phoneId', phonesController.destroy);
phonesRouter.put(
  '/users/:phoneId',
  celebrate({
    [Segments.PARAMS]: {
      phoneId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      phone: Joi.string().required(),
    },
  }),
  phonesController.update,
);

phonesRouter.patch(
  '/main/:phoneId',
  celebrate({
    [Segments.PARAMS]: {
      phoneId: Joi.string().uuid().required(),
    },
  }),
  phoneMainController.update,
);

export default phonesRouter;
