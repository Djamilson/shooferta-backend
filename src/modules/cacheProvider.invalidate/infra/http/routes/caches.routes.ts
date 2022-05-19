import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { Router } from 'express';
import { CachesController } from '../controllers/CachesController';

const cachesRouter = Router();

const cachesController = new CachesController();

cachesRouter.use(ensureAuthenticated);

// => /caches
cachesRouter.get('/invalidates', cachesController.invalidate);

export default cachesRouter;
