require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const routes = require("./routes/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("tiny"));
app.use("/", routes);

const execute = async () => {
    try {
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("DB connected!");
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server starting on port: ${process.env.PORT || 8080}`)
          })
    } catch (error) {
        console.log("Error : ", error);
    }
    
}

execute();