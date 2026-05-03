const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  from: String,
  to: String,
  subject: String,
  text: String,
  html: String,
  attachments: [
    {
      filename: String,
      contentType: String,
      size: Number,
      path: String, // File path or URL
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Email', emailSchema);
