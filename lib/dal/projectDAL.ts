import { connectDB } from "../db";
import { Project } from "@/models/projectModel";

export async function getProjects(conditions: { [key: string]: string|number }) {
    await connectDB();
    return Project.find(conditions);
}

export async function getProject(conditions: { [key: string]: string | number | undefined }) {
    await connectDB();
    return Project.findOne(conditions);
}

export async function getProjectById(id: string) {
    await connectDB();
    return Project.findById(id);
}

export async function createProject(data: { [key: string]: string|number }) {
    await connectDB();
    return Project.create(data);
}