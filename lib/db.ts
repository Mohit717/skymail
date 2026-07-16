import mongoose from "mongoose";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

const MONGODB_URI = String(process.env.MONGODB_URI);

export async function connectDB() {
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(MONGODB_URI).then(() => {
        console.log('✅ Connected to MongoDB');
    }).catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });
}