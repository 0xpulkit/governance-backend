const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Number,
        default: Date.now(),
        required: true
    }
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;