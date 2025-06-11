import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    jobType:{
      type: String,
    //   enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model('Job', jobSchema);

export default jobModel;