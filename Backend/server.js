import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./DB/db.connection.js";
import userModel from "./Model/user.model.js";
import jobModel from "./Model/jobModel.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/sign-up", async (req, res) => {
  const { RegisterAs, name, email, phone, password } = req.body;

  console.log("Received registration data:", {
    RegisterAs,
    name,
    email,
    phone,
    password,
  });

  if (!RegisterAs || !name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      console.log(`user already exist`);

      return res.status(400).json({ message: "user already exist" });
    }

    const savedData = await userModel.create(req.body);
    console.log(savedData);

    res.status(200).json({
      message: "User created successfully and saved in DB",
      success: true,
    });
  } catch (error) {
    console.log(error.message, `er in finding exist email`);

    res
      .status(500)
      .json({ message: "Internal server error in user registration" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, RegisterAs } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user does'nt exist" });
    }

    if (user.password != password) {
      return res.status(401).json({ message: "invalid credential" });
    }

    if (
      user.RegisterAs.trim().toLowerCase() != RegisterAs.trim().toLowerCase()
    ) {
      return res.status(403).json({
        message: `This user is not registered as ${user.RegisterAs} `,
      });
    }

    console.log(`login success to ${user.RegisterAs}`);
    res.status(200).json({
      message: "login successfull",
      userdetail: {
        id: user._id,
        name: user.name,
        email: user.email,
        RegisterAs: user.RegisterAs,
      },
    });
  } catch (error) {
    console.log(error.message,`error in login api`);
  }

});

app.post('/job/create', async (req, res) => {
  const { jobTitle, description, companyName, location, salary, experience } =
    req.body;

    const data={
      jobTitle,
      description,
      companyName,
      location,
      salary,
      experience,
      postedBy: User._id, 
    };
  // if (!title || !description || !company || !location || !salary || !postedBy) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  try {
    console.log(data, "Received job creation data");
    const newJob = await jobModel.create(data);

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/fetch/job", async (req, res) => {
  try {
    const jobs = await jobModel.find();
    console.log("Fetched jobs:", jobs);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log("Server is running on port =", PORT);
});
