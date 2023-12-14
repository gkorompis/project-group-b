const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { marketService } = require('../services');

const createMarket = catchAsync(async (req, res) => {
  const market = await marketService.createMarket(req.body);
  res.status(httpStatus.CREATED).send(market);
});

const getMarkets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await marketService.queryMarkets(filter, options);
  res.send(result);
});

const getMarket = catchAsync(async (req, res) => {
  const market = await marketService.getMarketById(req.params.marketId);
  if (!market) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Market not found');
  }
  res.send(market);
});

const updateMarket = catchAsync(async (req, res) => {
  const market = await marketService.updateMarketById(req.params.marketId, req.body);
  res.send(market);
});

const deleteMarket = catchAsync(async (req, res) => {
  await marketService.deleteMarketById(req.params.marketId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMarket,
  getMarkets,
  getMarket,
  updateMarket,
  deleteMarket,
};
