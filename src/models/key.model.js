const mongoose = require('mongoose');
const {toJSON, paginate } = require('./plugins');
const toObjectId = mongoose.Types.ObjectId;

const keySchema = mongoose.Schema({
  userId: {
    type: toObjectId,
    required: true,
  },
  IDS: [{
    key: {
      type: String,
    },
    value: {
      type: String
    }
  }],
  status: {
    type: Boolean
  }
},
{
  timestamps: true,
}
);

// add plugin that converts mongoose to json
keySchema.plugin(toJSON);
keySchema.plugin(paginate);
keySchema.set('timestamps', true);

/**
 * @typedef User
 */
const Keys = mongoose.models.keys || mongoose.model('keys', keySchema);

module.exports = Keys;