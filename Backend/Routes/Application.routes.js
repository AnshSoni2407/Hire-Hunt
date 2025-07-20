import express, { Router } from 'express'
import { applyJob } from "../Controller/Application.controller.js";
import upload from '../Middlewares/Multer.js';

const router = express.Router();

router.post("/apply", upload.single("resume"), applyJob);

export default router