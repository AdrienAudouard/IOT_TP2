const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const lumiereSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const LumiereSchema = mongoose.model('QueryCache', lumiereSchema);
lumiereSchema.plugin(uniqueValidator);
module.exports = LumiereSchema;

