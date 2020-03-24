const { User,Token} = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const {jwt_secret} = require('../config/config.json')[env];

const UserController = {
    async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                name: req.body.name,
                mail: req.body.mail,
                password,
                role: 'customer'
            });
            res.status(201).send({
                user,
                message: 'User created'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'There has been a problem'
            });
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    name: req.body.name
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'Wrong username or password'
                })
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Wrong username or password'
                })
            }
            const token = jwt.sign({
                id: user.id
            }, jwt_secret);
            Token.create({
                token,
                UserId: user.id
            });
            res.send({
                message: 'Welcome ' + user.name,
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'There has been a problem'
            });
        }
    },
    async getInfo(req,res){
        res.send(req.user);
    }
}
module.exports = UserController;