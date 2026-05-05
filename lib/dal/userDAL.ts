import { connectDB } from "../db";
import { User } from "@/models/userModel";

export async function getUserById(id: string) {
    await connectDB();
    return User.findById(id).select('firstName lastName email'); // Exclude password field
}

export async function getUser(conditions: { [key: string]: string|number }) {
    await connectDB();
    return User.findOne(conditions); // Exclude password field
}

export async function createUser(data: { [key: string]: string|number }) {
    await connectDB();
    return User.create(data);
}