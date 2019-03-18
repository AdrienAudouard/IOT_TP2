const Temperature = require('../models/temperature');

class TemperatureController {
  get(req, res) {
    let count = parseInt(req.query.count) || 20;

    if (count === NaN) {
      res.status(400).send({success: false, message: 'Count must be an integer'});
      return;
    }

    if (count < 1) {
      res.status(400).send({success: false, message: 'Count must be greater than 0'});
      return;
    }

    Temperature.find({}).sort({'date' : -1}).limit(count).exec((err, result) => {
      if (err !== null) {
        res.status(400).send({success: false, err});
        return;
      }

      res.status(200).send({success: true, result: result, count});
    });
  }

  put(req, res) {
    const value = req.body;

    Temperature.create({temperature : value.temperature}).then((temp) => {
      res.status(200).send({success: true, result: temp});
    }).catch((err) => {
      res.status(400).send({success: false, err});
    });
  }

  latest(req, res) {
    Temperature.findOne({}, {}, { sort: {'date' : -1} }).then((temp) => {
      res.status(200).send({success: true, result: temp});
    }).catch((err) => {
      res.status(400).send({success: false, err});
    });
  }
}

const tempController = new TemperatureController();
module.exports =  tempController;
