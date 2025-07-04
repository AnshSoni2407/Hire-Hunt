import React, { use, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const ExpandedCard = ({ closeExpand, job }) => {
  const [resume, setresume] = useState(null);

  console.log(job);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className=" text-center  w-[100%] bg-white  h-[100%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-10 ">
      <button
        onClick={() => {
          document.body.style.overflow = "auto";
          closeExpand();
        }}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black duration-300 cursor-pointer"
      >
        <IoMdClose />
      </button>

      <button
        onClick={() => {
          document.body.style.overflow = "auto";
          closeExpand();
        }}
        className="absolute top-2 left-2 text-xl text-gray-500 hover:text-black duration-300 cursor-pointer"
      >
        <IoArrowBack />
      </button>

      <div className=" overflow-y-auto  p-6">
        <h1 className="text-4xl font-bold mb-8">Job Details</h1>
        <div className="text-center mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Job Title : </h2>
          <h3 className="text-xl">{job.jobTitle}</h3>
        </div>
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Company Name : </h2>
          <h3 className="text-xl">{job.companyName}</h3>
        </div>
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Location : </h2>
          <h3 className="text-xl">{job.location}</h3>
        </div>{" "}
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Job Type : </h2>
          <h3 className="text-xl">{job.jobType}</h3>
        </div>{" "}
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Experience : </h2>
          <h3 className="text-xl">{job.experience}</h3>
        </div>
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Salary : </h2>
          <h3 className="text-xl">{job.salary}</h3>
        </div>
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Skills : </h2>
          <h3 className="text-xl">{job.skills}</h3>
        </div>
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold ">Description : </h2>
          <h3 className="text-xl">{job.description}</h3>
        </div>
        <div className="mb-6 flex items-center gap-4 align-center">
          <h2 className="text-xl font-semibold mb-4">Upload Resume :</h2>
          <input
            onChange={(e) => {
              setresume(e.target.files[0]);
            }}
            className="border-black rounded text-center border-2 "
            type="file"
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            disabled={!resume}
            className={`w-[50%] border-1 border-black rounded-lg p-2 font-semibold text-center text-lg duration-300 cursor-pointer
    ${
      !resume
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-black text-[#E0C163] hover:bg-[#E0C163] hover:text-black"
    }
  `}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;
