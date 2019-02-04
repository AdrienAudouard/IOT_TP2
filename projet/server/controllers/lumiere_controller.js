const resources = require('../utils/resources');
const request = require('request');
const Lumiere = require('../models/lumiere');

class LumiereController {
  get(req, res) {
    Lumiere.findOne({query, page}).then((cacheRes) => {
      if (cacheRes == null) {
        callApi();
        return
      }

      let currentDate = new Date().getTime();

      if ((currentDate - cacheRes.date.getTime()) > 3600000) {
        callApi();
        return;
      }

      res.status(200).send({success: true, result: cacheRes.result, query});
    }).catch((err) => {
      callApi();
    });
  }

  put(req, res) {
    const value = req.params.value;

    Lumiere.create({value}).then((lum) => {
      res.status(200).send({success: true, lum});
    }).catch((err) => {
      res.status(400).send({succes: false, err});
    });
  }

  latest(req, res) {
    let count = req.query.count || 30;
    let page = req.query.page || 1;

    if (!Number.isInteger(count) || !Number.isInteger(page)) {
      res.status(400).send({success: false, message: 'Params must be integer'});
      return;
    }

    if (count < 0 || count > 30) {
      res.status(400).send({success: false, message: 'Count must be between 0 and 30'});
      return;
    }

    if (page < 1) {
      res.status(400).send({success: false, message: 'Page number must be greater than 1'});
      return;
    }

    const options = {
      url: `https://api.unsplash.com/photos/random?count=${count}&page=${page}&order_by=latest`,
      headers: {
        'Authorization': `Client-ID ${resources.unsplashClientID}`
      }
    }

    request(options, (err, response, body) => {
      if (!err && response.statusCode == 200) {

        res.status(200).send({success: true, result: JSON.parse(body), count});
      } else {
        res.status(500).send({success: false, error: err});
      }
    });
  }
}

const lumiereController = new LumiereController();
module.exports =  LumiereController;
