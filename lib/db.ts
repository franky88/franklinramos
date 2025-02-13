import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL as string;

if (!MONGO_URL) {
  throw new Error("❌ MONGO_URL is not defined in environment variables.");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("🟢 Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🟡 Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGO_URL, {
      dbName: "myprofile",
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected!");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Debugging events
mongoose.connection.on("connected", () => console.log("✅ MongoDB Connection Established"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));
mongoose.connection.on("disconnected", () => console.log("⚠️ MongoDB Disconnected"));
