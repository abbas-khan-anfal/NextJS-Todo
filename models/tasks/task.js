import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
    unique: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  author : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const taskModel = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default taskModel;

