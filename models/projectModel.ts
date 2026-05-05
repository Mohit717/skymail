import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    smtpUsername: { type: String, required: true, unique: true },
    smtpPassword: { type: String, required: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);