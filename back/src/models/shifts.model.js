import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
    required: true, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export default mongoose.model("Shift", shiftSchema);
