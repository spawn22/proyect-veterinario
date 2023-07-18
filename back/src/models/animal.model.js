import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    animalName: {
      type: String,
      required: true,
    },
    animalOwner: {
      type: String,
      required: true,
    },
    animalType: {
      type: String,
      required: true,
    },
    animalAge: {
      type: Number,
      required: true,
    },
    animalGender: {
      type: String,
      required: true,
    },
    animalBreed: {
      type: String,
      required: true,
    },
    animalWeight: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Animal", animalSchema);
