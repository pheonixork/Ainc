const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const toObjectId = mongoose.Types.ObjectId;

const influencerSchema = mongoose.Schema({
  userId: {
    type: toObjectId,
    required: true,
  },
  infId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  infName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  star: {
    type: Number,
    default: 0,
  },
  postAt: {
    type: Date,
  },
  postLink: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  shopping: {
    type: String,
    default: "",
  },
  followers: {
    type: Number,
    default: 0,
  },
  engage: {
    type: Number,
    default: 0,
  },
  engagerate: {
    type: Number,
    default: 0,
  },
  rich: {
    type: Number,
    default: 0,
  },
  saving: {
    type: Number,
    default: 0,
  },
  oks: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  normal: {
    type: Number,
    default: 0,
  },
  prs: {
    type: Number,
    default: 0,
  },
  sell: {
    type: Number,
    default: 0,
  },
  roas: {
    type: Number,
    default: 0,
  },
  memo: {
    type: String,
  },
  campaigns: [{
    type: toObjectId,
  }],
  brief: {
    type: String
  }
},
{
  timestamps: true,
}
);

// add plugin that converts mongoose to json
influencerSchema.plugin(toJSON);
influencerSchema.plugin(paginate);
influencerSchema.set('timestamps', true);

/**
 * @typedef Influencers
 */
const Influencers = mongoose.models.influencers || mongoose.model('influencers', influencerSchema);

module.exports = Influencers;