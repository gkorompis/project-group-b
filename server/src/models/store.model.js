const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const storeSchema = mongoose.Schema(
  {
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
        ],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

/**
 * @typedef Store
 */
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;