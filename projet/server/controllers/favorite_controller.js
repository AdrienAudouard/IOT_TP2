const User = require('../models/user');

class FavoriteController {
    static checkUser(req, res, user, err) {
        const token = req.headers['x-access-token'];

        if (err) {
            console.log(`err: ${JSON.stringify(err)}`);
            res.status(500).send({success: false, err});
            return false;
        }

        if (user == null) {
            res.status(404).send({ success: false, message: 'Wrong id'});
            return false;
        }

        if (user.token !== token) {
            res.status(401).send({ success: false, message: 'You\' not allowed to view the ressource'});
            return false;
        }

        return true
    }

    getFavorites(req, res) {
        const id = req.params.id;

        User.findById(id).exec((err, user) => {
            if (FavoriteController.checkUser(req, res, user, err)) {
                res.status(200).send({success: true, result: user.favorites, message: 'Success', count: user.favorites.length});
            }
        });
    }

    addFavorite(req, res) {
        const id = req.params.id;
        const fav = req.body.favorite;

        if (fav == null) {
            res.status(400).send({success: false, message: 'Missing param favorite'})
        }

        User.findById(id).exec((err, user) => {
            if (FavoriteController.checkUser(req, res, user, err)) {
                user.favorites.push(fav);

                user.save((err) => {
                    if (err) {
                        res.status(500).send({success: false, err});
                    } else {
                        res.status(200).send({success: true, message: 'Favorite added', favorites: user.favorites, count: user.favorites.length});
                    }
                });
            }
        });
    }

    removeFavorite(req, res) {
        const id = req.params.id;
        const fav = req.params.fav;

        User.findById(id).exec((err, user) => {
            if (FavoriteController.checkUser(req, res, user, err)) {
                user.favorites = user.favorites.filter((value) => {return value.id != fav});

                user.save((err) => {
                    if (err) {
                        res.status(500).send({success: false, err});
                    } else {
                        res.status(200).send({success: true, message: 'Favorite added', favorites: user.favorites, count: user.favorites.length});
                    } 
                })
            }
        });
    }
}

const favController = new FavoriteController()

module.exports = favController;