const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const influencerSchema = mongoose.Schema({
  infId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true, 
    default: 1
  },
  followers: {
    type: Number,
    required: true,
    default: 0,
  },
  engage: {
    type: Number,
    required: true,
    default: 0,
  },
  cmpId: {
    type: ObjectId,
    required: true,
  },
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

/**
 * @typedef User
 */
const Influencer = mongoose.models.influencers || mongoose.model('influencers', influencerSchema);

module.exports = Influencer;