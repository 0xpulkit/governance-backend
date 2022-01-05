const mongoose = require('mongoose');

const proposalSchema = mongoose.Schema({
    proposalId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    edited: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now(),
        required: true
    }
});

const Proposal = mongoose.model("proposal", proposalSchema);

module.exports = Proposal;