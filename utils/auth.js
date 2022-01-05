require('dotenv').config();
const Admin = require('../models/admin');

async function authorize(req, res, next) {
    const admin = Admin.findOne({
        address: req.body.address}, 
        {_id: 0, __v: 0}).lean();
    
    if (!admin) {
        res.send(401).json({ message: "Unauthorized access" });
    }
    next();
}

module.exports = authorize;