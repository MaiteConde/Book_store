const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const env = process.env.NODE_ENV || 'development';
const {  jwt_secret } = require('../config/config.json')[env];
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret); 
        const user = await User.findByPk(payload.id); 
        req.user = user; 
        next(); 
    } catch (error) {
        res.status(401).send({
            message: 'Not authorized',
            error
        })
    }
}
const isAdmin = async (req, res, next) => {
    const admins =['superAdmin','admin','dios'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'You do not have permission to view this section'
        });
    }
    next();
}
module.exports = {
    authentication,
    isAdmin
};