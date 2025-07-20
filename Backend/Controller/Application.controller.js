import ApplicationModel from "../Model/Applications.model.js"
import cloudinary from "../Utils/Cloudinary.js";


export const applyJob = async (req, res) => {
  try {
    const { jobId, jobSeekerId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "resumes" },
      async (error, uploadResult) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary error", error });
        }

        // Save to DB
        const newApplication = new ApplicationModel({
          jobId,
          jonSeekerId: jobSeekerId,
          resumeUrl: uploadResult.secure_url,
        });

        await newApplication.save();
        return res
          .status(201)
          .json({ message: "Application submitted successfully" });
      }
    );

    // Pipe the file buffer to Cloudinary
    const stream = result;
    stream.end(file.buffer);
  } catch (error) {
    console.error("Apply Job Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
