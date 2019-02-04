const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const resources = require('../utils/resources');
class UserController {
    create(req, res) {
        const pwd = bcrypt.hashSync(req.body.password, 8);

        User.create({
            mail: req.body.mail,
            password: pwd,
            pseudo: req.body.pseudo,
        }).then((user) => {
            res.status(200).send({success: true, user});
        }).catch((err) => {
            res.status(400).send({succes: false, err});
        });
    }

    exists(req, res) {
        if (!req.body.mail || !req.body.password) {
            res.status(400).send({ success: false, message: 'Missing password or email'});
            return;
        }

        User.findOne({ mail : req.body.mail}).exec((err, user) => {
            if (err) {
                console.log(`err: ${JSON.stringify(err)}`);
                res.status(500).send({success: false, err});
                return
            }
          if (user == null) {
            res.status(401).send({ success: false, message: 'Wrong email / password'});
            return;
          }

          const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

          if (!passwordIsValid) {
            res.status(401).send({ success: false, message: 'Wrong email / password'});
            return;
          }

          resources.tokenBlackList.push(user.token);
          const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24, // Token available 24 hours
            data: user.mail
          }, resources.secret + ip);

          user.token = token

          user.save(err => {
            res.status(200).send({ success: true, message: 'Logged in', id: user._id, email: user.mail, pseudo: user.pseudo, token: token});
          });

          /*
          User.findOneAndUpdate({mail: req.body.mail}, {$set:{token}}).then(() => {
            
          }).catch((err) => {
              console.log(`err: ${JSON.stringify(err)}`);
            res.status(500).send({success: false, err});
          }); */
        });
    }

    get(req, res) {
        const id = req.params.id;
        console.log(id);
        User.findById(id).then((user) => {
            res.status(200).send({success: true, user});
        }).catch((err) => {
            res.status(404).send({ success: false, message: 'Cannot find user' });
        });
    }
}

const userController = new UserController();
module.exports =  userController;
