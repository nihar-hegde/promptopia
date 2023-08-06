import mongoose, { mongo } from "mongoose";

let isConnected = false; //track db connection status

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongo DB is already connected!!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongo DB connected succesfullly!!!");
  } catch (error) {
    console.log("you have an error while connecting to mongodb", error);
  }
};
