import mongoose from "mongoose";

let isConnected = false; // Corrected variable name to follow camelCase convention

export const connectDB = async () => {
  // Corrected function name to follow camelCase convention
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    console.log(process.env.NEXT_PUBLIC_MONGODB_URL);
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, {
      dbName: "Cluster0", // Replaced space with underscore
      useNewUrlParser: true, // Corrected option name
      useUnifiedTopology: true, // Corrected option name
    });
    isConnected = true;
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(error);
  }
};
