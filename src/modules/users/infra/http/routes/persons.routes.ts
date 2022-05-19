import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PersonsController } from '../controllers/PersonsController';
import ProfileController from '../controllers/ProfileController';
import ProfilePasswordController from '../controllers/ProfilePasswordController';
import { UpdateEmailController } from '../controllers/UpdateEmailController';
import { UpdateNameEmailController } from '../controllers/UpdateNameEmailController';
import { UpdateProfileDataController } from '../controllers/UpdateProfileDataController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticanted';

const profileRouter = Router();
const profileController = new ProfileController();
const profilePasswordController = new ProfilePasswordController();
const updateNameEmailController = new UpdateNameEmailController();

const updateProfileDataController = new UpdateProfileDataController();
const updateEmailController = new UpdateEmailController();

const personsController = new PersonsController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);


profileRouter.get(
  '/:personId',
  celebrate({
    [Segments.PARAMS]: {
      personId: Joi.string().uuid().required(),
    },
  }),
  personsController.show,
);


profileRouter.put(
  '/datas',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      birth_date: Joi.string().required(),
    },
  }),
  updateProfileDataController.update,
);

profileRouter.patch(
  '/emails',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  updateEmailController.update,
);

profileRouter.put(
  '/passwords',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profilePasswordController.update,
);

profileRouter.put(
  '/name/email',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  updateNameEmailController.update,
);

export default profileRouter;
