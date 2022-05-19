import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import PoliticController from '@modules/politics/infra/http/controllers/PoliticsController';
import { MenuPoliticsController } from '@modules/politics/infra/http/controllers/MenuPoliticsController';
import PaginationController from '../controllers/PaginationController';

const politicsRouter = Router();
const politicsController = new PoliticController();
const paginationController = new PaginationController();
const menuPoliticsController = new MenuPoliticsController();
// => /politics
//logged not

politicsRouter.get(
  '/pagination/list',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  paginationController.index,
);

politicsRouter.get('/', politicsController.index);
politicsRouter.get('/menus', menuPoliticsController.index);
politicsRouter.get(
  '/menus/:politic_id',
  celebrate({
    [Segments.PARAMS]: {
      politic_id: Joi.string().uuid().required(),
    },
  }),
  menuPoliticsController.show,
);
// precisa está autentication

politicsRouter.use(ensureAuthenticated);

politicsRouter.get(
  '/:politicId',
  celebrate({
    [Segments.PARAMS]: {
      politicId: Joi.string().uuid().required(),
    },
  }),
  politicsController.show,
);

politicsRouter.put(
  '/:politicId',
  celebrate({
    [Segments.PARAMS]: {
      politicId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  politicsController.update,
);

politicsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  politicsController.create,
);

export default politicsRouter;
