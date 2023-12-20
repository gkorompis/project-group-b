const Joi = require('joi');
const { objectId} = require('./custom.validation');

const createStore = {
  body: Joi.object().keys({
    id_store: Joi.string().required(),
    id_user: Joi.string().required().custom(objectId),
    store_name: Joi.string().required(),
    store_category: Joi.string().required(),
  }),
};

const getStores = {
  query: Joi.object().keys({
    id_store: Joi.string(),
    id_user: Joi.string(),
    store_name: Joi.string(),
    store_category: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStore = {
  params: Joi.object().keys({
    storeId: Joi.string().custom(objectId),
  }),
};

const updateStore = {
  params: Joi.object().keys({
    storeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      store_name: Joi.string(),
      store_category: Joi.string(),
      id_user: Joi.string(),
    })
    .min(1),
};

const deleteStore = {
  params: Joi.object().keys({
    storeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
};