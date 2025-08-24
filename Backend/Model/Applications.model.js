
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Accepted", "Rejected"],
      default: "Applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
export default ApplicationModel;
