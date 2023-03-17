const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'trash', 'published'],
    default : 'published'
  },
  imported_t: {
    type: Date,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  creator: {
    type: String,
    require: true
  },
  created_t: {
    type: Number,
    require: true
  },
  last_modified_t: {
    type: Number,
    require: true
  },
  product_name: {
    type: String,
    require: true
  },
  quantity: {
    type: String,
    require: true
  },
  brands: {
    type: String,
    require: true
  },
  categories: {
    type: String,
    require: true
  },
  labels: {
    type: String,
    require: true
  },
  cities: {
    type: String,
    require: true
  },
  purchase_places: {
    type: String,
    require: true
  },
  stores: {
    type: String,
    require: true
  },
  ingredients_text: {
    type: String,
    require: true
  },
  traces: {
    type: String,
    require: true
  },
  serving_size: {
    type: String,
    require: true
  },
  serving_quantity: {
    type: String,
    require: true
  },
  nutriscore_score: {
    type: Number,
    require: true
  },
  nutriscore_grade: {
    type: String,
    require: true
  },
  main_category: {
    type: String,
    require: true
  },
  image_url: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('products', productsSchema);