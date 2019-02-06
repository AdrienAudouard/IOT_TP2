const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const lumiereSchema = new mongoose.Schema({
  lumiere: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const LumiereSchema = mongoose.model('LumiereSchema', lumiereSchema);
lumiereSchema.plugin(uniqueValidator);
module.exports = LumiereSchema;

