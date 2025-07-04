import React, { useEffect, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { GiModernCity, GiTakeMyMoney } from "react-icons/gi";
import { IoLocation, IoPeopleSharp } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import axios from "axios";
import ExpandedCard from "./ExpandedCard.jsx";


const JobCards = ({ jobs }) => {
  const [cardExpand, setcardExpand] = useState(false);
  const [selectedJob, setselectedJob] = useState(null);


  const loggedInUser = JSON.parse(localStorage.getItem("loggedInEmp")).id;

  const closeExpandedCard = () => {
    setcardExpand(false);
  };


  const handleSavedJob = async ({ job, userId }) => {
    try {
      await axios.post(`http://localhost:3000/job/savedJobs/${job}/${userId}`);
      console.log(job);
      console.log("Job saved successfully");
    } catch (error) {
      console.log(`Error saving job: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {cardExpand && (
        <ExpandedCard closeExpand={closeExpandedCard} job={selectedJob} />
      )}
      {jobs.map((job) => (
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
              <p className="inline font-semibold truncate ">
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
              onClick={() => {
                setcardExpand(true);
                setselectedJob(job);
              }}
              className="w-[75%] border-1 border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-center text-lg hover:bg-[#E0C163] hover:text-black duration-300 cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => {
                handleSavedJob({ job: job._id, userId: loggedInUser });
              }}
              className="w-[15%] border-1 border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-extrabold text-2xl hover:bg-[#E0C163] hover:text-black duration-300 text-center pl-2 cursor-pointer"
            >
              <MdOutlineBookmarkAdd />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
