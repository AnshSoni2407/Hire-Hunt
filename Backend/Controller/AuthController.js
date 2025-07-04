import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../Model/user.model.js";
dotenv.config();

export const signUp =  async (req, res) => {
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
};

export const login =  async (req, res) => {
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
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log(`login success to ${user.RegisterAs}`);
      console.log(token, "token generated");
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
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
      console.log(error.message, `error in login api`);
    }
  };

  export const logout = (req, res) => {
    try {
      res.clearCookie("token");
      // localStorage.clear

      res.status(200).json({ message: "Logout successful" });
      console.log("User logged out successfully");
    } catch (error) {
      console.log(error.message, `error in logout api`);
    }
  };