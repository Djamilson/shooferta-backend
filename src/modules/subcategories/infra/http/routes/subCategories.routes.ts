import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import multer from 'multer';

const upload = multer(uploadConfig.multer);

import SubCategoriesController from '@modules/subcategories/infra/http/controllers/SubCategoriesController';
import { SubCategoriesListPaginationController } from '@modules/subcategories/infra/http/controllers/SubCategoriesListPaginationController';
import { UpdateNameSubCategoriesController } from '@modules/subcategories/infra/http/controllers/UpdateNameSubCategoriesController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';

const subcategoriesRouter = Router();

const subcategoriesController = new SubCategoriesController();

const updateNameSubCategoriesController =
  new UpdateNameSubCategoriesController();

const subcategoriesListPaginationController =
  new SubCategoriesListPaginationController();

subcategoriesRouter.use(ensureAuthenticated);

// => /subcategories

// subcategoriesRouter.get('/', subcategoriesController.index);

subcategoriesRouter.get(
  '/pagination',
  subcategoriesListPaginationController.index,
);

subcategoriesRouter.get('/', subcategoriesController.index);
subcategoriesRouter.get('/:subCategoryId', subcategoriesController.show);

subcategoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  subcategoriesController.create,
);

subcategoriesRouter.patch(
  '/:subCategoryId/name',
  celebrate({
    [Segments.PARAMS]: {
      subCategoryId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  updateNameSubCategoriesController.update,
);

export default subcategoriesRouter;
