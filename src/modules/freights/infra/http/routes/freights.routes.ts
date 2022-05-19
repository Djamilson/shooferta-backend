import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { FreightsController } from '@modules/freights/infra/http/controller/FreightsController';

const freightsRouter = Router();

const freightsController = new FreightsController();

freightsRouter.get(
  '/:cep',
  celebrate({
    [Segments.PARAMS]: {
      cep: Joi.string().required(),
    },
  }),
  freightsController.show,
);

export { freightsRouter };
