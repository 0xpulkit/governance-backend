const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
        index: true
    },
    created: {
        type: Number,
        default: Date.now(),
        required: true
    }
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;