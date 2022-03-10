require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

async function authorize(req, res, next) {
    try {
        var token = req.headers["authorization"];
        if (!token) {
            res.sendStatus(401);
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            }
            const admin = await Admin.findOne({
                address: decoded
            },
                { _id: 0, __v: 0 }).lean();

            if (!admin) {
                res.sendStatus(401);
            }

            next();
        })

    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(401);
    }

}

module.exports = authorize;