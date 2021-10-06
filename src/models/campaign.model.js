const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const campaignSchema = mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    requried: true
  },
  name: {
    type: String,
    required: true,
  },
  sns: {
    type: String,
    required: true, 
  },
  type: {
    type: String,
    required: true,
  },
  members: [{
    infId: {
      type: String,
      required: true, 
    },
    step: {
      type: Number,
      required: true,
      default: 1
    },
    postDate: {
      type: Date
    },
    postUrl: {
      type: String
    },
    shop: {
      type: String
    },
    rich: {
      type: Number
    },
    saves: {
      type: Number
    },
    no: {
      type: Number
    },
    com: {
      type: Number
    },
    inp: {
      type: Number
    },
    click: {
      type: Number
    },
    staff: {
      type: Number
    },
    sell: {
      type: Number
    },
  }],
},
{
  timestamps: true,
}
);

// add plugin that converts mongoose to json
campaignSchema.plugin(toJSON);
campaignSchema.plugin(paginate);

/**
 * @typedef User
 */
const Campaign = mongoose.models.campaigns || mongoose.model('campaigns', campaignSchema);

module.exports = Campaign;