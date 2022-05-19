import uploadConfig from '@config/upload';
import CategoriesController from '@modules/categories/infra/http/controllers/CategoriesController';
import { CategoriesListPaginationController } from '@modules/categories/infra/http/controllers/CategoriesListPaginationController';
import { CategoriesPhotoController } from '@modules/categories/infra/http/controllers/CategoriesPhotoController';
import { CollectionsController } from '@modules/categories/infra/http/controllers/CollectionsController';
import { UpdateDescriptionCategoriesController } from '@modules/categories/infra/http/controllers/UpdateDescriptionCategoriesController';
import { UpdateNameCategoriesController } from '@modules/categories/infra/http/controllers/UpdateNameCategoriesController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { UpdateTypeCategoriesController } from '../controllers/UpdateTypeCategoriesController';

const upload = multer(uploadConfig.multer);

const categoriesRouter = Router();

const updateDescriptionCategoriesController =
  new UpdateDescriptionCategoriesController();

const categoriesController = new CategoriesController();
const categoriesPhotoController = new CategoriesPhotoController();
const collectionsController = new CollectionsController();

const updateNameCategoriesController = new UpdateNameCategoriesController();
const updateTypeCategoriesController = new UpdateTypeCategoriesController();

const categoriesListPaginationController =
  new CategoriesListPaginationController();

//not logged

categoriesRouter.get(
  '/collections',
  celebrate({
    [Segments.QUERY]: {
      categoryId: Joi.string().uuid().required(),
      page: Joi.string().required(),
      limit: Joi.string().required(),
      status: Joi.boolean().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  collectionsController.show,
);

categoriesRouter.get(
  '/:type',
  celebrate({
    [Segments.PARAMS]: {
      type: Joi.string().required(),
    },
  }),
  categoriesController.index,
);

///categoriesRouter.use(ensureAuthenticated);

// => /categories

// categoriesRouter.get('/', categoriesController.index);

categoriesRouter.get(
  '/:categoryId/edit',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().required(),
    },
  }),
  categoriesController.show,
);

categoriesRouter.get(
  '/pagination/list',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  categoriesListPaginationController.index,
);

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  categoriesController.create,
);

categoriesRouter.patch(
  '/:categoryId/name',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  updateNameCategoriesController.update,
);

categoriesRouter.patch(
  '/:categoryId/type',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      type: Joi.string().required(),
    },
  }),
  updateTypeCategoriesController.update,
);

categoriesRouter.patch(
  '/:categoryId/description',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  updateDescriptionCategoriesController.update,
);

categoriesRouter.patch(
  '/:categoryId/photo',
  ensureAuthenticated,
  upload.single('file'),
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().required(),
    },
  }),
  categoriesPhotoController.update,
);
export default categoriesRouter;
