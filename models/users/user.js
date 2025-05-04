import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  img_path : {
    type: String,
    default : "",
  },
  img_pub_id : {
    type: String,
    default : "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;

