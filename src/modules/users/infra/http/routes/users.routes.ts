import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import UserAvatarController from '../controllers/UserAvatarController';
import { UsersController } from '../controllers/UsersController';
import { UsersListPaginationController } from '../controllers/UsersListPaginationController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticanted';

const upload = multer(uploadConfig.multer);

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const usersListPaginationController = new UsersListPaginationController();

//not logged in user
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      groups: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().required(),
        }),
      ),
    },
  }),
  usersController.create,
);

// logged
usersRouter.use(ensureAuthenticated);

usersRouter.get('/', usersController.index);

usersRouter.get(
  '/me/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

usersRouter.get(
  '/pagination',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  usersListPaginationController.index,
);

usersRouter.patch(
  '/avatar',
  upload.single('file'),
  userAvatarController.update,
);

export default usersRouter;
