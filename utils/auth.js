require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

async function authorize(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        res.send(401).json({ message: "Unauthorized access" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
        if(error) {
            res.send(401).json({ message: "Unauthorized access" });
        }

        const admin = Admin.findOne({
            username: decoded.username,
            password: decoded.password }, 
            {_id: 0, __v: 0}).lean();
        
        if (!admin) {
            res.send(401).json({ message: "Unauthorized access" });
        }
        next();
    });
}

module.exports = authorize;