require('dotenv').config();
const Admin = require('../models/admin');

async function authorize(req, res, next) {
    try {
        const admin = await Admin.findOne({
            address: req.body.address}, 
            {_id: 0, __v: 0}).lean();
        
        if (!admin) {
            res.sendStatus(401);
        } else {
            next();
        }

    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(401);
    }

}

module.exports = authorize;