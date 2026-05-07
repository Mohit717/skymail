import { connectDB } from "../db";
import { Email } from "@/models/emailModel";
import { MAX_LIMIT } from "../utils";

export async function getEmailsByProjectId(
  projectId: string,
  page: number = 1,
  limit: number = MAX_LIMIT
) {
  await connectDB();

  // Ensure valid values
  page = Math.max(1, page);
  limit = Math.max(1, limit);

  const skip = (page - 1) * limit;

  // Run queries in parallel
  const [emails, total] = await Promise.all([
    Email.find({ projectId })
      .select("subject from createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Email.countDocuments({ projectId }),
  ]);

  return {
    data: emails,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}

export async function getEmailById(id: string) {
  await connectDB();
  return Email.findById(id).lean();
}

export async function createEmail(data: { [key: string]: any }) {
    await connectDB();
    return Email.create(data);
}
