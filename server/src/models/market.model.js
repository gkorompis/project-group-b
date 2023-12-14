const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const marketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
marketSchema.plugin(toJSON);
marketSchema.plugin(paginate);

/**
 * @typedef Market
 */
const Market = mongoose.model('Market', marketSchema);

module.exports = Market;
