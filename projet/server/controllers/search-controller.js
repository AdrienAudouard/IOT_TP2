const resources = require('../utils/resources');
const request = require('request');
const QueryCache = require('../models/query-cache');

class SearchController {
    search(req, res) {
        const query = req.query.q;

        let page = req.query.page || 1;

        const callApi = () => {
            const options = {
                url: `https://api.unsplash.com/photos/search?query=${query}&per_page=20&page=${page}`,
                headers: {
                    'Authorization': `Client-ID ${resources.unsplashClientID}`
                }
            }
    
            request(options, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    QueryCache.update({query}, {query, result: JSON.parse(body)}, {upsert: true, setDefaultsOnInsert: true}).then(() => {
                        res.status(200).send({success: true, result: JSON.parse(body), query});
                    }).catch((err) => {
                        res.status(200).send({success: true, result: JSON.parse(body), query});
                    });
                } else {
                    res.status(500).send({success: false, error: err});
                }
            })
        }

        QueryCache.findOne({query, page}).then((cacheRes) => {
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

    popular(req, res) {
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
            url: `https://api.unsplash.com/photos/random?count=${count}&page=${page}&order_by=popular`,
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

    random(req, res) {
        let count = req.query.count || 30;

        if (!Number.isInteger(count)) {
            res.status(400).send({success: false, message: 'Params must be integer'});
            return;
        }

        if (count < 0 || count > 30) {
            res.status(400).send({success: false, message: 'Count must be between 0 and 30'});
            return;
        }

        const options = {
            url: `https://api.unsplash.com/photos/random?count=${count}`,
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

const searchController = new SearchController();
module.exports =  searchController;