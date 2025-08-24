import ApplicationModel from "../Model/Applications.model.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId, userId } = req.params;

    const application = new ApplicationModel({
      jobId,
      jobSeekerId: userId,
      resumeUrl: req.file.path,
    });

    await application.save();
    console.log("success");
    res.status(201).json({
      success: true,
      message: "Job applied successfully",
    });
  } catch (error) {
    console.error("Apply Job Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to apply job",
    });
  }
};

export const fetchAppliedJobs = async (req, res) => {
  const { userId } = req.params;
  console.log("User ID from params:", userId); // Debug line

  try {
    const appliedJobs = await ApplicationModel.find({
      jobSeekerId: userId,
    }).populate({
      path: "jobId",
      populate: {
        path: "postedBy",
        model: "User",
        select: 'phone',
      },
    });

    console.log("Fetched Jobs:", appliedJobs);

    res.status(200).json({
      message: "Fetched applied jobs successfully",
      success: true,
      jobs: appliedJobs,
    });
  } catch (error) {
    console.error("Fetch Applied Jobs Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch applied jobs" });
  }
};


export const fetchApplicants = (req, res) => {

  const {userId} = req.params.userId;

  try {
    const applicants = ApplicationModel.find().populate({
      path: "jobId",
      populate: {
        path: "postedBy",
        model: "User",
        select: 'phone',
      },
    });
    console.log(applicants);
    res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      applicants: applicants
    });
  } catch (error) {
    console.error("Fetch Applicants Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applicants"
    });
  }
}