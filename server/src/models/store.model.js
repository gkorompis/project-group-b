const mongoose = require('mongoose');
const { toJSON, paginate} = require('./plugins');
// const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const { required } = require('joi');
const {User} = require('./user.model');

autoIncrement.initialize(mongoose.connection);

const storeSchema = mongoose.Schema(
  {
    id_store: {
      type: String,
      default: 0,
      required: true,
      trim: true,
    },
    store_name: {
      type: String,
      required: true,
      trim: true,
    },
    store_category: {
        type: String,
        required: true,
        trim: true,
        enum: [
            'Elektronik', //Electronic
            'Makanan & Minuman', //Food & Beverages
            'Perawatan & Kecantikan', //Beauty & Health
            'Perlengkapan Rumah', //Home Supplies
            'Pakaian Pria', //Menswear
            'Pakaian Wanita', //Women's Clothing
            'Hobi & Koleksi', //Hobbies & Collections
            'Otomotif', //Automotive
            'Olahraga & Outdoor', //Sports & Outdoors
            'Buku & Alat Tulis', //Book & Stationery
            'Lainnya'//Others
        ],
    },
      id_user: {
        type: String,
        ref: 'User',
        required: true,
        trim: true,
      }
  },
  {
    timestamps: true,
  },
  
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);
storeSchema.plugin(autoIncrement.plugin, {
  model: 'Store',
  field: 'id_store'
})

/**
 * @typedef Store
 */
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;