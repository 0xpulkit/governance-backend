require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

async function authorize(req, res, next) {
    try {
        var auth = req.headers["authorization"];
        console.log(auth);
        if (!auth) {
            return res.sendStatus(401);
        }
        var token = auth.split(" ")
        jwt.verify(token[1], process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }
            const admin = await Admin.findOne({
                address: decoded.id
            },
                { _id: 0, __v: 0 }).lean();

            if (!admin) {
                res.sendStatus(401);
            }

            next();
        })

    } catch (error) {
        console.log("error: ", error);
        return res.sendStatus(401);
    }

}

module.exports = authorize;