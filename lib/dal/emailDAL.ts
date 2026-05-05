import { connectDB } from "../db";
import { Email } from "@/models/emailModel";

export async function getEmailsByProjectId(projectId: string) {
  await connectDB();
  return Email.find({ projectId }).sort({ createdAt: -1 }).lean();
}

export async function getEmailById(id: string) {
  await connectDB();
  return Email.findById(id).lean();
}

export async function createEmail(data: { [key: string]: any }) {
    await connectDB();
    return Email.create(data);
}
