const Lumiere = require('../models/lumiere');

class LumiereController {
  get(req, res) {
    Lumiere.find({}).then((lums) => {
      res.status(200).send({success: true, result: lums});
    }).catch((err) => {
      res.status(400).send({succes: false, err});
    })
  }

  put(req, res) {
    const value = req.body;

    console.log(value);

    Lumiere.create({lumiere : value.lumiere}).then((lum) => {
      res.status(200).send({success: true, result: lum});
    }).catch((err) => {
      res.status(400).send({succes: false, err});
    });
  }

  latest(req, res) {
    Lumiere.findOne({}, {}, { sort: {'date' : -1} }).then((lum) => {
      res.status(200).send({success: true, result: lum});
    }).catch((err) => {
      res.status(400).send({succes: false, err});
    });
  }
}

const lumiereController = new LumiereController();
module.exports =  lumiereController;
