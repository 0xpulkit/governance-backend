require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const Proposal = require('../models/proposal');
const Admin = require('../models/admin');
const req = require('express/lib/request');

// TODO(raneet10): Add some more controllers(and also find better names)    
const loginController = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let admin = await Admin.findOne({
            username: req.body.username,
            password: req.body.password}, 
            {_id: 0, __v: 0}).lean();
        
        if(admin) {
            const match = await bcrypt.compareSync(req.body.password, admin.password);

            if(match) {
                const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: "24h" });
                return res.status(200).json({
                    message: "Login Success!",
                    auth_token: token,
                    data: admin
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorized access" })
            }
        }
        else {
            return res.status(401).json({ message: "Unauthorized access" })
        }
    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(400);
    }
}

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

module.exports = { loginController ,addController, updateController, fetchController }