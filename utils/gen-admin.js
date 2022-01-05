require('dotenv').config();
const Admin = require('../models/admin');

 async function genAdmin(address) {
     const admin = await Admin.create({
         address: address
     });

     return admin;
 }

 const address = process.env.ADDRESS;

 genAdmin(address)
 .then(res => {
     console.log(res);
    })
 .catch(err => {
     console.log(err);
    });