//import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PageAccessesCounterController from '../controller/PageAccessesCounterController';

const pageAccessesCounterRouter = Router();

const pageAccessesCounterController = new PageAccessesCounterController();

//not logged

//pageAccessesCounterRouter.use(ensureAuthenticated);

// => /forgotten/carts

pageAccessesCounterRouter.get('/', pageAccessesCounterController.index);

pageAccessesCounterRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      metadata: Joi.object(),
    },
  }),
  pageAccessesCounterController.create,
);

export default pageAccessesCounterRouter;
