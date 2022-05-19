import uploadConfig from '@config/upload';
import DescriptionsController from '@modules/products/infra/http/controllers/DescriptionsController';
import { DescriptionsListPaginationController } from '@modules/products/infra/http/controllers/DescriptionsListPaginationController';
import { DetailsProductController } from '@modules/products/infra/http/controllers/DetailsProductController';
import ProductsController from '@modules/products/infra/http/controllers/ProductsController';
import { ProductsListPaginationController } from '@modules/products/infra/http/controllers/ProductsListPaginationController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import { CategoriesProductsController } from '../controllers/CategoriesProductsController';
import { DataProductsController } from '../controllers/DataProductsController';
import { PhotosProductsController } from '../controllers/PhotosProductsController';

const productsRouter = Router();
const productsController = new ProductsController();
const descriptionsController = new DescriptionsController();
const detailsProductController = new DetailsProductController();

const productsListPaginationController = new ProductsListPaginationController();
const descriptionsListPaginationController =
  new DescriptionsListPaginationController();

const categoriesProductsController = new CategoriesProductsController();
const photosProductsController = new PhotosProductsController();

const dataProductsController = new DataProductsController();

const upload = multer(uploadConfig.multer);

//not logged in

productsRouter.get(
  '/pagination/list',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      status: Joi.boolean().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  productsListPaginationController.index,
);

productsRouter.get(
  '/details',
  celebrate({
    [Segments.QUERY]: {
      productId: Joi.string().uuid().required(),
    },
  }),
  detailsProductController.show,
);

productsRouter.get(
  '/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

//logged
productsRouter.use(ensureAuthenticated);

// => /products

productsRouter.get(
  '/categories/products/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
  }),
  categoriesProductsController.show,
);

productsRouter.get(
  '/photos/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
  }),
  photosProductsController.show,
);

productsRouter.get(
  '/pagination/descriptions',
  descriptionsListPaginationController.index,
);

productsRouter.get('/', productsController.index);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      sku: Joi.string().required(),
      bar_code: Joi.string().optional().allow(''),
      other: Joi.object(),
      price: Joi.number().required(),
      price_promotion: Joi.number().required(),
      category_id: Joi.string().uuid().required(),
      description_id: Joi.string().uuid().required(),
      subcategory_id: Joi.string().uuid().required(),

      productInfo: Joi.object().keys({
        price: Joi.number().required(),
        price_promotion: Joi.number().required(),
        link: Joi.string().required(),
        freight: Joi.number().required(),
        company: Joi.string().required(),
        currency: Joi.string().required(),
        stock: Joi.number().required(),
      }),
    },
  }),
  productsController.create,
);

productsRouter.post(
  '/descriptions',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  descriptionsController.create,
);

productsRouter.post(
  '/categories/products/new',
  celebrate({
    [Segments.BODY]: {
      productId: Joi.string().uuid().required(),
      categoryId: Joi.string().uuid().required(),
    },
  }),
  categoriesProductsController.create,
);

productsRouter.delete(
  '/categories/products/:categoryId/:productId',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().uuid().required(),
      productId: Joi.string().uuid().required(),
    },
  }),
  categoriesProductsController.delete,
);

productsRouter.delete(
  '/photos/:photoId',
  celebrate({
    [Segments.PARAMS]: {
      photoId: Joi.string().uuid().required(),
    },
  }),
  photosProductsController.delete,
);

productsRouter.put(
  '/photos/:photoId',
  celebrate({
    [Segments.PARAMS]: {
      photoId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      priority: Joi.number().required(),
    },
  }),
  photosProductsController.update,
);

productsRouter.post(
  '/photos',
  upload.single('file'),

  photosProductsController.create,
);

productsRouter.put(
  '/data/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      sku: Joi.string().required(),
      bar_code: Joi.string().optional().allow(''),
      description_id: Joi.string().uuid().required(),
      subcategory_id: Joi.string().uuid().required(),
    },
  }),
  dataProductsController.update,
);

productsRouter.put(
  '/other/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      other: Joi.object(),
    },
  }),
  productsController.update,
);

export default productsRouter;
