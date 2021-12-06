const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const updateHistorySchema = mongoose.Schema({
  updated: {
    type: String
  },
},
{
  timestamps: true,
}
);

// add plugin that converts mongoose to json
updateHistorySchema.plugin(toJSON);
updateHistorySchema.plugin(paginate);
updateHistorySchema.set('timestamps', true);

/**
 * @typedef User
 */
const UpdateHistory = mongoose.models.updatehistory || mongoose.model('updatehistory', updateHistorySchema);

module.exports = UpdateHistory;