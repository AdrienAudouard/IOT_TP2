const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const tempSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const TemperatureSchema = mongoose.model('TemperatureSchema', tempSchema);
tempSchema.plugin(uniqueValidator);
module.exports = TemperatureSchema;

