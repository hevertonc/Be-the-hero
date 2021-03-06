const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index)
      .post('/ongs', celebrate({
            [Segments.BODY]: Joi.object().keys({
                  name: Joi.string().required().min(3),
                  email: Joi.string().required().email(),
                  whatsapp: Joi.string().required().min(10).max(11),
                  city: Joi.string().required(),
                  region: Joi.string().required().length(2)
            })
      }), OngController.create);

routes.get('/incidents', IncidentController.indexValidator, IncidentController.index)
      .post('/incidents', IncidentController.create)
      .delete('/incidents/:id', celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                  id: Joi.number().required()
            }),
            [Segments.HEADERS]: Joi.object({
                  authorization: Joi.string().required()
            }).unknown()
      }), IncidentController.delete);

routes.get('/profile', celebrate({
      [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
      }).unknown()
}), ProfileController.index);

module.exports = routes;