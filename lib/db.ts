import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.URI;

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  dbName: "myprofileDB",
  bufferCommands: true,
};

const connect = async () => {
  console.log(MONGODB_URI);
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Database is already connected!");
    return;
  }

  if (connectionState === 2) {
    console.log("Database is currently connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (error: unknown) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connect;
