const {validationResult} = require('express-validator');
const Proposal = require('../models/proposal');

// TODO(raneet10): Add some more controllers(and also find better names)    
const addController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        await Proposal.create({
            proposalId: req.body.proposalId,
            title: req.body.title,
            description: req.body.description,
            created: req.body.created,
            edited: req.body.edited,
            timestamp: Date.now()
        })
        res.sendStatus(200);
    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(400);
    }
}

const updateController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        await Proposal.updateOne({
            proposalId: req.body.proposalId
        }, {
            title: req.body.title,
            description: req.body.description,
            edited: req.body.edited,
            timestamp: Date.now()
        });
        res.sendStatus(200);
    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(400);
    }
}

const fetchController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        let proposal = await Proposal.findOne({
            proposalId: req.query.proposalId}, 
            {_id: 0, __v: 0}).lean();
         
        if (!proposal) {
            proposal={};
        }
        res.send(proposal).json();
    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(400);
    }
}

module.exports = { addController, updateController, fetchController }