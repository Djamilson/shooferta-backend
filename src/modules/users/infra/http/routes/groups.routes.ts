import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import GroupsController from '../controllers/GroupsController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticanted';

const groupsRouter = Router();
const groupsController = new GroupsController();

groupsRouter.use(ensureAuthenticated);

groupsRouter.get('/', groupsController.index);

groupsRouter.get(
  '/:groupId',
  celebrate({
    [Segments.PARAMS]: {
      groupId: Joi.string().uuid().required(),
    },
  }),
  groupsController.show,
);

groupsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  groupsController.create,
);

export default groupsRouter;
