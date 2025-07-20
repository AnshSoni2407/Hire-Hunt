import express, { Router } from 'express'
import {applyjob} from "../Controller/Application.controller.js"
import upload from '../Middlewares/Multer.js';

const router = express.Router();

router.post("/apply",upload.single('resume') ,applyjob);

export default router