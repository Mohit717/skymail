import { connectDB } from "./lib/db";

connectDB().catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
});