const crypto = require("crypto");
const userMdl = require("../models/user.mdl");
const projectMdl = require("../models/project.mdl");

const generateUniqueCredentials = async () => {
  // Generate a random base string
  const smtpUsername = "smtp_" + crypto.randomBytes(6).toString("hex");
  const smtpPassword = crypto.randomBytes(12).toString("base64url");

  // Ensure username uniqueness in DB
  const exists = await projectMdl.findOne({ smtpUsername });
  if (exists) {
    // retry if collision occurs (extremely rare)
    return generateUniqueCredentials();
  }

  return { smtpUsername, smtpPassword };
};

const generateUsername = async () => {
  // Generate a username
  const username = crypto.randomBytes(4).toString("hex");
  
  // Ensure username uniqueness in DB
  const exists = await userMdl.findOne({ username });
  if (exists) {
    // retry if collision occurs (extremely rare)
    return generateUsername();
  }

  return username;
};

module.exports = {
  generateUniqueCredentials,
  generateUsername
};