const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { storeService } = require('../services');

const createStore = catchAsync(async (req, res) => {
  const store = await storeService.createStore(req.body);
  res.status(httpStatus.CREATED).send(store);
});

const getStores = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['id_store','id_user','store_name','store_category',]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await storeService.queryStores(filter, options);
  res.send(result);
});

const getStore = catchAsync(async (req, res) => {
  const store = await storeService.getStoreById(req.params.storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'store not found');
  }
  res.send(store);
});

const updateStore = catchAsync(async (req, res) => {
  const store = await storeService.updateStoreById(req.params.storeId, req.body);
  res.send(store);
});

const deleteStore = catchAsync(async (req, res) => {
  await storeService.deleteStoreById(req.params.storeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
};
