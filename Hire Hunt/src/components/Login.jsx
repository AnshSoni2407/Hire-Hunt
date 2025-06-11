import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson, IoIosMail, IoMdUnlock } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const [RegisterAs, setregisterAs] = useState("jobseeker");
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const Navigate = useNavigate()


const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    RegisterAs: RegisterAs.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password: password,
  };

  try {
    const res = await axios.post("http://localhost:3000/login", data);
    console.log("data send to backend of login");

    const userRole = res.data.userdetail.RegisterAs;
    console.log(userRole);
    console.log(res.data.userdetail, "user detail in login");
    localStorage.setItem("role", userRole);

    // ✅ Navigate here directly based on role
    if (userRole == "jobseeker") {
      Navigate("/jobseekerDash");
    } else if (userRole === "employer") {
      Navigate("/employerDash");
    }

  } catch (error) {
    console.log(error.message, "error in axios sending data to backend");
  }
};
 

  return (
    <div className="flex items-center justify-center h-screen bg-purple-200  ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center justify-center h-auto w-1/2 p-4  bg-white rounded-lg "
      >
        <h1 className="text-4xl font-bold mb-16">Login</h1>

        <label htmlFor="registerAs" className="text-xl">
          Register as
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <select
            id="registerAs"
            onChange={(e) => {
              setregisterAs(e.target.value);
            }}
            name="registerAs"
            className=" w-[90%] bg-gray-300 p-2  text-center"

            defaultValue="jobseeker"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          <div className=" h-full w-[10%]  text-white bg-black p-2 flex items-center justify-center text-2xl">
            {" "}
            <IoMdPerson />{" "}
          </div>
        </div>

        <label htmlFor="email" className="text-xl">
          Email Address
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <input
            type="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            id="email"
            className=" w-[90%] bg-gray-300 p-2  text-center"
            name="email"
            placeholder="Enter your Email"
          />
          <div className=" h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <IoIosMail />
          </div>
        </div>
        <label htmlFor="password" className="text-xl">
          Password
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className=" w-[90%] bg-gray-300 p-2  text-center"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
          />
          <div className=" h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <IoMdUnlock />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 mb-6 cursor-pointer hover:bg-blue-600 hover:w-full duration-300 font-semibold text-white p-2 w-1/2 rounded-full"
        >
          Login
        </button>
        <Link to="sign-up" className="w-full">
          <button
            type="button"
            className="text-white font-semibold cursor-pointer hover:w-full duration-300 mb-6font-semibold bg-black  p-2 w-1/2 rounded-full"
          >
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
