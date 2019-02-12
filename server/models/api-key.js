const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const ApiKeySchema = mongoose.model('apiKeySchema', apiKeySchema);
apiKeySchema.plugin(uniqueValidator);
module.exports = ApiKeySchema;

