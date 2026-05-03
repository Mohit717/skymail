const ObjectId = require('mongodb').ObjectId;
const emailMdl = require('../models/email.mdl');
const Email = require("../models/email.mdl");

const fetchEmails = async (req, res) => {
    try {
        const { projectId } = req.query
        const _emails = await emailMdl.find({ projectId }).sort({ date: -1 }).select("_id from subject createdAt"); // newest first
        return res.json(_emails);
    } catch (err) {
        console.error('❌ Failed to fetch emails:', err);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
}

const fetchEmailById = async (req, res) => {
    try {
        const _email = await Email.findOne({ _id: new ObjectId(req.params.id) });
        return res.json(_email);
    } catch (err) {
        console.error('❌ Failed to fetch email:', err);
        res.status(500).json({ error: 'Failed to fetch email' });
    }
}

const deleteEmailById = async (req, res) => {
    try {
        const _email = await Email.findOneAndDelete({ _id: new ObjectId(req.params.id) });
        return res.json(_email);
    } catch (err) {
        console.error('❌ Failed to delete email:', err);
        res.status(500).json({ error: 'Failed to delete email' });
    }
}

module.exports = {
    fetchEmails,
    fetchEmailById,
    deleteEmailById
}