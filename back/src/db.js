import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/veterinaria-proyect");
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
