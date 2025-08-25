import React from "react";
import { MdArrowBack } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Applicants = () => {

  const [applicants, setapplicants] = useState([])
  const user = JSON.parse(localStorage.getItem("loggedInEmp"));
 const userId = user.id
  const fetchApplicants = async ()=>{
    console.log(userId)


    const res = await axios.get(`http://localhost:3000/application/fetch/applicants/${userId}`)
    console.log( res.data.applicants);
    setapplicants(res.data.applicants)
  }

  useEffect(() => {
    fetchApplicants()
  }, [])


  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6">
        <Link to="/employerDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <MdArrowBack />
          </button>
        </Link>

        <h1 className="text-3xl font-semibold">Applicant</h1>
        <Link to="/employerDash">
          {" "}
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <IoCloseOutline />
          </button>
        </Link>
      </div>

      {/*  card */}
      <div className="flex flex-wrap justify-center">
        {applicants.map((applicant, index) => {
          return (
            <div
              key={index}
              className="w-65 lg:w-72 p-4 m-5 bg-[#fff4d4] rounded-2xl flex flex-col hover:scale-102 duration-300 hover:bg-[#ffefb9] shadow-md shadow-[#E0C163]"
            >
              <h2 className="font-bold text-2xl  truncate mb-1">
                {applicant.jobSeekerId.name}
              </h2>

              <h3 className="font-medium text-xl text-gray-600 truncate mb-2 text">
                {applicant.jobId.jobTitle}
              </h3>

              <div className="flex items-center  tracking-widest justify-center">
                <IoCall /> <p> : {applicant.jobSeekerId.phone}</p>
              </div>

              <div className="flex items-center justify-evenly">
                <a
                  href={applicant.resumeUrl}
                  className="w-[30%] border  rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-sm hover:bg-[#E0C163] hover:text-black duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <select className="w-[55%]  border border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-sm hover:bg-[#E0C163] hover:text-black duration-300">
                  <option value={"Pending"}>Pending</option>
                  <option value={"Accepted"}>Accepted</option>
                  <option value={"Rejected"}>Rejected</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Applicants;
