const projectMdl = require('../models/project.mdl');
const Project = require('../models/project.mdl');
const userMdl = require('../models/user.mdl');
const { generateUniqueCredentials } = require('../utils/helper');

const create = async (req, res) => {
    const { name, description } = req.body;
    try {
        const { me } = req
        const { smtpUsername, smtpPassword } = await generateUniqueCredentials();
        const _project = await Project.create({
            name,
            description,
            owner: me.id,
            smtpUsername,
            smtpPassword
        });

        res.status(200).json({
            message: 'New project created successfully!'
        });

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong while creating new project. Please try again later.',
            error: err.message
        });
    }
}

const listProjects = async (req, res) => {
    try {
        const { me } = req
        const projects = await projectMdl.find({ owner: me.id });
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong while getting the projects. Please try again later.',
            error: "some error message"
        });
    }
}

module.exports = {
    create,
    listProjects,
};