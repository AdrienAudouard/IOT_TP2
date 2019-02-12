const ApiKey = require('../models/api-key');
const jwt = require('jsonwebtoken');
const resources = require('../utils/resources');

class ApiKeyController {
  create(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60) * 9999999, // Token available 24 hours
      data: ip
    }, resources.secret);
    
    ApiKey.create({key: token}).then(() => {
        res.status(200).send({success: true, key: token});
    }).catch((err) => {
        res.status(400).send({success: false, err});
    });
  }

  delete(req, res) {
    const key = req.body.key;

    ApiKey.deleteOne({ key }).then(() => {
        res.status(200).send({success: true, message: 'Removed with success'});
    }).catch((err) => {
        res.status(400).send({success: false, err});
    });
  }
}

const apiKeyController = new ApiKeyController();
module.exports =  apiKeyController;
