require('dotenv').config();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

 async function genAdmin(username, password) {
     const admin = await Admin.create({
         username: username,
         password: password
     });

     return admin;
 }

 let password;
 const username = process.env.USERNAME;
 const textPassword = process.env.PASSWORD;
 const saltRounds = 10;

 bcrypt.hash(textPassword, saltRounds)
 .then(function(hash) {
     password = hash;
 }); 

 genAdmin(username, password)
 .then(res => {
     console.log(res);
    })
 .catch(err => {
     console.log(err);
    });