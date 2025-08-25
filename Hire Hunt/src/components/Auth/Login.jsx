import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson, IoIosMail, IoMdUnlock } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [RegisterAs, setregisterAs] = useState("jobseeker");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      RegisterAs: RegisterAs.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password
    };

    try { 
  
      const res = await axios.post("http://localhost:3000/auth/login", data,{
        withCredentials:true
      });
      console.log("data sent to backend");

      const userRole = res.data.userdetail.RegisterAs;
      const userDetails = res.data.userdetail;

      localStorage.setItem("role", userRole);
      localStorage.setItem("loggedInEmp", JSON.stringify(userDetails)); // storing full object

      if (userRole === "jobseeker") {
        Navigate("/jobseekerDash");
      } else if (userRole === "employer") {
        Navigate("/employerDash");
      }
    } catch (error) {
      console.log("Login error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center justify-center h-auto w-[90%] md:w-1/2 p-4 bg-white rounded-lg"
      >
        <h1 className="text-4xl font-bold mb-16">Login</h1>

        <label
        
         htmlFor="registerAs" className="text-xl">
          Register as
        </label>
        <div className="w-full flex items-center justify-center mb-8  overflow-hidden">
          <select
            id="registerAs"
            onChange={(e) => setregisterAs(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 rounded-lg text-left"
            defaultValue="jobseeker"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          <div className="w-[10%] bg-black p-2 text-white flex justify-center items-center text-2xl">
            <IoMdPerson />
          </div>
        </div>

        <label htmlFor="email" className="text-xl">
          Email Address
        </label>
        <div className="w-full flex items-center justify-center mb-8 overflow-hidden">
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 text-left rounded-lg"
            placeholder="Enter your Email"
          />
          <div className="w-[10%] bg-black p-2 text-white flex justify-center items-center text-2xl">
            <IoIosMail />
          </div>
        </div>

        <label htmlFor="password" className="text-xl">
          Password
        </label>
        <div className="w-full flex items-center justify-center mb-8 overflow-hidden">
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 text-left rounded-lg"
            placeholder="Enter your Password"
          />
          <div className="w-[10%] bg-black p-2 text-white flex justify-center items-center text-2xl">
            <IoMdUnlock />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 mb-6 hover:bg-blue-600 hover:w-full duration-300 font-semibold text-white p-2 w-1/2 rounded-full"
        >
          Login
        </button>

        <Link to="sign-up" className="w-full">
          <button
            type="button"
            className="text-white bg-black font-semibold p-2 w-1/2 rounded-full hover:w-full duration-300"
          >
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
