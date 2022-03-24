require("dotenv").config();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
const Proposal = require('../models/proposal');
const verifySig = require('../utils/auth');

const loginController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const isAdmin = await verifySig(req.body.address, req.body.signature)

        if (!isAdmin) {
            return res.sendStatus(401);
        }

        var token = jwt.sign({ id: req.body.address }, process.env.JWT_SECRET, { expiresIn: "24h" });
        return res.status(200).json({
            owner: req.body.address,
            auth_token: token
        })
    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(401);
    }
}

const newAdminController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const owner = await Admin.findOne({
            address: req.body.address
        });

        if (owner) {
            return res.status(400).json({
                message: "Owner already exists!"
            });
        }

        await Admin.create({
            address: req.body.address,
            created: Date.now()
        });

        return res.sendStatus(200);

    } catch (error) {
        console.log("error: ", error);
        return res.sendStatus(400);
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
            proposalId: req.query.proposalId
        },
            { _id: 0, __v: 0 }).lean();

        if (!proposal) {
            proposal = {};
        }
        res.send(proposal).json();
    } catch (error) {
        console.log("error: ", error);
        res.sendStatus(400);
    }
}

module.exports = { loginController, newAdminController, addController, updateController, fetchController }