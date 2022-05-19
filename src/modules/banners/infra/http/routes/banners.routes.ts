import uploadConfig from '@config/upload';
import BannersController from '@modules/banners/infra/http/controllers/BannersController';
import { BannersListPaginationController } from '@modules/banners/infra/http/controllers/BannersListPaginationController';
import { BannersListSearchTypeAndStatusController } from '@modules/banners/infra/http/controllers/BannersListSearchTypeAndStatusController';
import { UpdateStatusBannersController } from '@modules/banners/infra/http/controllers/UpdateStatusBannersController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { BannersPriorityController } from '../controllers/BannersPriorityController';

const upload = multer(uploadConfig.multer);

const bannersRouter = Router();

const bannersListSearchTypeAndStatusController =
  new BannersListSearchTypeAndStatusController();

const updateStatusBannersController = new UpdateStatusBannersController();
const bannersController = new BannersController();

const bannersListPaginationController = new BannersListPaginationController();
const bannersPriorityController = new BannersPriorityController();

//not logged
bannersRouter.get(
  '/actives',
  celebrate({
    [Segments.QUERY]: {
      type: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  bannersListSearchTypeAndStatusController.index,
);

bannersRouter.use(ensureAuthenticated);

// => /banners

bannersRouter.get('/', bannersController.index);
bannersRouter.get('/pagination', celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      status: Joi.boolean().required(),
      q: Joi.string().optional().allow(''),
    },
  }), bannersListPaginationController.index);

bannersRouter.get('/:bannerId', bannersController.show);

bannersRouter.post(
  '/',
  upload.single('file'),
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
    },
  }),
  bannersController.create,
);

bannersRouter.patch(
  '/:bannerId/status',

  celebrate({
    [Segments.PARAMS]: {
      bannerId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.boolean().required(),
    },
  }),
  updateStatusBannersController.update,
);

bannersRouter.put(
  '/:bannerId',
  celebrate({
    [Segments.PARAMS]: {
      bannerId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      priority: Joi.number().required(),
    },
  }),
  bannersPriorityController.update,
);

export default bannersRouter;
