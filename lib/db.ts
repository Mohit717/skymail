import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_URI = "mongodb://localhost:27017/skymail";

export async function connectDB() {
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(MONGODB_URI).then(() => {
        console.log('✅ Connected to MongoDB');
    }).catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });
}