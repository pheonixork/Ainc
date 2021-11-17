const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const toObjectId = mongoose.Types.ObjectId;

const usageSchema = mongoose.Schema({
  userId: {
    type: toObjectId,
    required: true,
  },
  history: [{
    historydate: {
      type: String,
    },
    historyend: {
      type: String,
    },
    paytype: {
      type: Number,
      required: true,
      default: 0,
    },
    periodtype: {
      type: Number,
      required: true,
      default: 0
    },
    plantype: {
      type: String,
      required: true,
      default: 'Free trial'
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: Number,
      required: true
    },
    pagesplan: {
      type: Number
    },
    pagesuse: {
      type: Number
    },
    profiesplan: {
      type: Number
    },
    profiesuse: {
      type: Number
    },
    reportsplan: {
      type: Number
    },
    reportsuse: {
      type: Number
    },
    csvplan: {
      type: Number
    },
    csvuse: {
      type: Number
    },
    updatemode: {
      type: Boolean
    }
  }]
},
{
  timestamps: true,
}
);

// add plugin that converts mongoose to json
usageSchema.plugin(toJSON);
usageSchema.plugin(paginate);
usageSchema.set('timestamps', true);

/**
 * @typedef Usage
 */
const Usage = mongoose.models.usage || mongoose.model('usage', usageSchema);

module.exports = Usage;