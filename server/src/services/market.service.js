const httpStatus = require('http-status');
const { Market } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new marketplace
 * @param {Object} marketBody
 * @returns {Promise<Market>}
 */
const createMarket = async (marketBody) => {
  return Market.create(marketBody);
};

/**
 * Query for markets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMarkets = async (filter, options) => {
  const markets = await Market.paginate(filter, options);
  return markets;
};

/**
 * Get market by id
 * @param {ObjectId} id
 * @returns {Promise<Market>}
 */
const getMarketById = async (id) => {
  return Market.findById(id);
};

/**
 * Update market by id
 * @param {ObjectId} marketId
 * @param {Object} updateBody
 * @returns {Promise<Market>}
 */
const updateMarketById = async (marketId, updateBody) => {
  const market = await getMarketById(marketId);
  if (!market) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Marketplace not found');
  }
  Object.assign(market, updateBody);
  await market.save();
  return market;
};

/**
 * Delete market by id
 * @param {ObjectId} marketId
 * @returns {Promise<Market>}
 */
const deleteMarketById = async (marketId) => {
  const market = await getMarketById(marketId);
  if (!market) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Marketplace not found');
  }
  await market.remove();
  return market;
};

module.exports = {
  createMarket,
  queryMarkets,
  getMarketById,
  updateMarketById,
  deleteMarketById,
};
