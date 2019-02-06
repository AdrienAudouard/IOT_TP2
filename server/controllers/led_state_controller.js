const LedState = require('../models/led_state');

class LedStateController {
  get(req, res) {
    LedState.findOne({id: 1}).then((result) => {
      console.log(result);
      if (result === undefined || result === null) {
        res.status(200).send(true);
      } else {
        res.status(200).send(result.value);
      }

    }).catch((err) => {
      console.log(err);
      res.status(400).send({succes: false, err});
    })
  }

  put(req, res) {
    const query = {};
    const update = { value: req.body.value };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    LedState.updateOne(query, update, options).then(() => {
      LedState.findOne({id: 1}).then((result) => {
        console.log(result);
        if (result === undefined || result === null) {
          res.status(200).send(true);
        } else {
          res.status(200).send(result.value);
        }
      })
    }).catch((err) => {
      console.log(err);
      res.status(400).send({succes: false, err});
    });
  }
}

const ledStateController = new LedStateController();
module.exports =  ledStateController;
