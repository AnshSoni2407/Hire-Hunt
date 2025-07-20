import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Utils/Cloudinary.js";


const storage = new CloudinaryStorage({
cloudinary,
  params: {
    folder: "HireHunt",
    format: async (req, file) => "png", 
    public_id: (req, file) =>      file.fieldname + "-" + Math.random() + "-" + Date.now(),
  },
});



const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
  

export default upload;