const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    smtpUsername: { type: String, required: true, unique: true },
    smtpPassword: { type: String, required: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);