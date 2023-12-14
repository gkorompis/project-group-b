const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMarket = {
  body: Joi.object().keys({
    title: Joi.string().required()
  }),
};

const getMarkets = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMarket = {
  params: Joi.object().keys({
    marketId: Joi.string().custom(objectId),
  }),
};

const updateMarket = {
  params: Joi.object().keys({
    marketId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
    })
    .min(1),
};

const deleteMarket = {
  params: Joi.object().keys({
    marketId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMarket,
  getMarkets,
  getMarket,
  updateMarket,
  deleteMarket,
};