const Lumiere = require('../models/lumiere');

class LumiereController {
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

    Lumiere.find({}).sort({'date' : -1}).limit(count).exec((err, result) => {
      if (err !== null) {
        res.status(400).send({success: false, err});
        return;
      }

      res.status(200).send({success: true, result: result, count});
    });
  }

  put(req, res) {
    const value = req.body;

    console.log(value);

    Lumiere.create({lumiere : value.lumiere}).then((lum) => {
      res.status(200).send({success: true, result: lum});
    }).catch((err) => {
      res.status(400).send({success: false, err});
    });
  }

  latest(req, res) {
    Lumiere.findOne({}, {}, { sort: {'date' : -1} }).then((lum) => {
      res.status(200).send({success: true, result: lum});
    }).catch((err) => {
      res.status(400).send({success: false, err});
    });
  }
}

const lumiereController = new LumiereController();
module.exports =  lumiereController;
