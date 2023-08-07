import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zaitsez2014:WHezH19UPOdJaxTB@cluster0.cm8iynm.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
