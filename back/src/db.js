import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
