import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Utils/Cloudinary";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "HireHunt",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) =>
      file.fieldname + "-" + Math.random() + "-" + Date.now(),
  },
});



const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
  

export default upload;