const mongoose = require('mongoose');
const {toJSON, paginate } = require('./plugins');

const planSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  monthval: {
    type: Number,
  },
  yearval: {
    type: Number,
  },
  isfree: {
    type: Number,
  },
  pages: {
    type: Number,
  },
  profies: {
    type: Number,
  },
  reports: {
    type: Number,
  },
  csv: {
    type: Number,
  },
  isinsight: {
    type: Number,
  },
  iscampaign: {
    type: Number,
  },
  isaccount: {
    type: Number,
  }
},
{
  timestamps: true,
}
);

// add plugin that converts mongoose to json
planSchema.plugin(toJSON);
planSchema.plugin(paginate);
planSchema.set('timestamps', true);

/**
 * @typedef User
 */
const Plans = mongoose.models.plans || mongoose.model('plans', planSchema);

module.exports = Plans;