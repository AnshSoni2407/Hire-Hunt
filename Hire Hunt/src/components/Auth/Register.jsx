import React, { useState } from 'react'
import { IoMdPerson, IoIosMail, IoMdUnlock } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { Link } from "react-router-dom";
import Login from './Login.jsx';
import axios from 'axios';

const Register = () => {

  const [RegisterAs, setRegisterAs] = useState("jobseeker");
  const [name, setname] = useState('');
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
const handleSubmit = async (e) => {
  e.preventDefault();

const data = {
    RegisterAs: RegisterAs,
    name: name,
    email: email,
    phone: phone,
    password: password
}

try {
  const res = await axios.post("http://localhost:3000/auth/sign-up", data);
  console.log(`submitted`, res);
} catch (error) {
  console.error("Error submitting form:", error.message);
}
}


  return (
    <div className="flex items-center justify-center h-screen bg-purple-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center justify-center h-auto w-[90%] md:w-1/2 p-4 bg-white rounded-lg"
      >
        <h1 className="text-4xl font-bold mb-16">Create a new account</h1>

        <label htmlFor="registerAs" className="text-xl">
          Register As
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <select
            id="registerAs"
            name="registerAs"
            onChange={(e) => {
              setRegisterAs(e.target.value);
            }}
            className="w-[90%] bg-gray-300 p-2 text-center"
            defaultValue="jobseeker"
          >

            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <IoMdPerson />
          </div>
        </div>

        <label htmlFor="name" className="text-xl">
          Name
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            className="w-[90%] bg-gray-300 p-2 text-center"
            name="name"
            placeholder="Enter your name"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <MdDriveFileRenameOutline />
          </div>
        </div>

        <label htmlFor="email" className="text-xl">
          Email Address
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="w-[90%] bg-gray-300 p-2 text-center"
            name="email"
            placeholder="Enter your email"
          
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <IoIosMail />
          </div>
        </div>

        <label htmlFor="phone" className="text-xl">
          Phone Number
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <input
            type="tel"
            onChange={(e) => {
              setphone(e.target.value);
            }}
            id="phone"
            className="w-[90%] bg-gray-300 p-2 text-center"
            name="phone"
            placeholder="Enter your phone"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <FaPhoneAlt />
          </div>
        </div>

        <label htmlFor="password" className="text-xl">
          Password
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 rounded-md overflow-hidden">
          <input
            className="w-[90%] bg-gray-300 p-2 text-center"
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl">
            <IoMdUnlock />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 mb-6 cursor-pointer hover:bg-blue-600 hover:w-full duration-300 font-semibold text-white p-2 w-1/2 rounded-full"
        >
          Register
        </button>
        <Link to="/" className="w-full">
          <button
            type="button"
            className="text-white cursor-pointer  font-semibold hover:w-full duration-300 mb-6font-semibold bg-black  p-2 w-1/2 rounded-full"
          >
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Register;