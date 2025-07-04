import express from "express";
import {
  create,
  fetch,
  saveJob,
  fetchSaveJob,
  fetchCreatedJobs,
  removeSavedJob,
} from "../Controller/JobController.js";
import { verifyToken } from "../Middlewares/Token.js";
const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/fetch", fetch);

router.post("/savedJobs/:job/:userId", saveJob);

router.get("/fetch/savedJobs/:userId", fetchSaveJob);

router.get("/fetch/createdJobs/:userId", fetchCreatedJobs);

router.delete("/removeSavedJob/:jobId/:userId", removeSavedJob);

export default router;
