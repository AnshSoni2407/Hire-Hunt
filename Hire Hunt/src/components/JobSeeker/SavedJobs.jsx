import axios from "axios";
import React, { useState } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoLocation, IoPeopleSharp } from "react-icons/io5";
import { GiModernCity, GiTakeMyMoney } from "react-icons/gi";
import { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

import JobSeekerDashboard from "../dashboard/JobSeekerDashboard";



const SavedJobs = () => {
  const [savedJobs, setsavedJobs] = useState([]);

  const fetchSavedJobs = async () => {
    const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;
    console.log(userId);

    // sending id to backend to fetch saved jobs in this user account

    try {
      const jobs = await axios.get(`http://localhost:3000/job/fetch/savedJobs/${userId}`,
        { withCredentials: true }
      );
      // saved jobd in user account
      console.log(jobs.data.SavedJobs);  
      setsavedJobs(jobs.data.SavedJobs);

    } catch (error) {
      console.error("Error fetching saved jobs:", error.message);
    }
  }; 

  useEffect(() => {
    fetchSavedJobs()

  }, [])
// we have to fetch saved jobs from backend and display them in this component in dashboard to use global state we can use redux or context api but for now we will use local state

const handleRemoveJob = async (jobId) => {
  try {
    const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;

    await axios.delete(
      `http://localhost:3000/job/removeSavedJob/${jobId}/${userId}`
    );

    // Remove job from local UI state
    const updatedJobs = savedJobs.filter((job) => job._id !== jobId);
    setsavedJobs(updatedJobs);
  } catch (error) {
    console.log("Error removing job:", error.message);
  }
};

  return (
    <div>
      {" "}
      <div className=" mt-6 mb-6 flex justify-between items-center  p-4  shadow-lg bg-black">
        <button className="text-[#c8ac5a] text-2xl bg-black p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300">
          <Link to={"/jobseekerDash"}>
            <IoArrowBack />
          </Link>
        </button>
        <h2 className="text-4xl text-[#c8ac5a]  p-1 "> SAVED JOBS</h2>
        <button className="text-[#c8ac5a] text-2xl bg-black p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300">
          <Link to={"/jobseekerDash"}>
            <IoClose />
          </Link>
        </button>
      </div>
      {savedJobs.length > 0 ? (
        <div className="flex flex-wrap gap-6 mt-6 justify-evenly">
          {" "}
          {savedJobs.map((job) => {
            return (
              <div
                key={job._id}
                className="w-80 h-[250px] bg-[#fff4d4] rounded-2xl p-3 m-2 hover:scale-105 duration-300 hover:bg-[#ffefb9] shadow-sm shadow-[#E0C163] hover:shadow-lg hover:shadow-[#E0C163]"
              >
                <h2 className="font-bold text-3xl text-center overflow-hidden truncate">
                  {job.jobTitle}
                </h2>
                <h3 className="mb-4 font-semibold text-sm truncate text-gray-500 overflow-hidden">
                  <HiBuildingOffice2 className="inline overflow-hidden" /> :{" "}
                  {job.companyName}
                </h3>

                <div className="flex justify-between mb-4">
                  <h4>
                    <IoLocation className="inline text-xl truncate overflow-hidden" />{" "}
                    : {job.location}
                  </h4>
                  <div>
                    <GiModernCity className="inline text-xl" /> :{" "}
                    <p className="inline font-semibold truncate overflow-hidden">
                      {job.jobType}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <h2>
                    <GiTakeMyMoney className="inline text-xl" />:{" "}
                    <p className="inline font-semibold truncate overflow-hidden">
                      {job.salary} LPA
                    </p>
                  </h2>

                  <div>
                    <IoPeopleSharp className="inline text-xl" />:{" "}
                    <p className="inline font-semibold truncate overflow-hidden">
                      {job.experience}
                    </p>
                  </div>
                </div>

                <div className="flex justify-evenly mt-9">
                  <button
                    // onClick={() => {
                    //   setcardExpand(true);
                    //   setselectedJob(job);
                    // }}
                    className="w-[75%] border-1 border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-center text-lg hover:bg-[#E0C163] hover:text-black duration-300 cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleRemoveJob(job._id)}
                    className="w-[15%] flex items-center justify-center rounded-lg bg-black text-[#E0C163] font-semibold text-2xl hover:bg-[#E0C163] hover:text-black duration-300"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-[10%] text-4xl">No saved jobs</div>
      )}
    </div>
  );
};

export default SavedJobs;
