const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const ledStateSchema = new mongoose.Schema({
  value: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const LedStateSchema = mongoose.model('ledStateSchema', ledStateSchema);
ledStateSchema.plugin(uniqueValidator);
module.exports = LedStateSchema;

