import React, { useState, useEffect } from "react";
import axios from "axios";

import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CreatedJobTable = () => {
  const [createdJobsByEmp, setcreatedJobsByEmp] = useState([]);

  const createdJobs = async () => {
    const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;
    console.log(userId);

    try {
      const res = await axios.get(
        `http://localhost:3000/job/fetch/createdJobs/${userId}`,
        {
          withCredentials: true,
        }
      );
      setcreatedJobsByEmp(res.data.createdJobs.CreatedJobs);

      console.log(createdJobsByEmp, "Created jobs by emp");
    } catch (error) {
      console.error("Error fetching created jobs:", error.message);
    }
  };

  useEffect(() => {
    createdJobs();
  }, []);

  return (
    <div>
      <div>
        <Link to={"/employerDash"}>
          <div className="absolute top-3 right-3 text-3xl font-extrabold cursor-pointer text-gray-700 hover:text-black">
            <IoCloseOutline />
          </div>
        </Link>

        {/* back button */}

        <Link to={"/employerDash"}>
          <div className="absolute top-3 left-3 text-3xl font-extrabold cursor-pointer text-gray-700 hover:text-black">
            <IoMdArrowBack />
          </div>
        </Link>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8 text-center text-[#E0C163] bg-black p-4">
          Create Job
        </h1>

        {createdJobsByEmp.length == 0 ? (
          <div>NO CREATED JOBS</div>
        ) : (
          <table className="w-full bg-white shadow-md  rounded-lg overflow-hidden mt-8 mb-8">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 w-1/7  text-center">Job Title</th>
                <th className="py-3 w-1/7 text-center">Company Name</th>
                <th className="py-3 w-1/7 text-center">Location</th>
                <th className="py-3 w-1/7 text-center">Job Type</th>
                <th className="py-3 w-2/7 text-center">Description</th>
                <th className="py-3 w-1/7 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row, replace with dynamic data */}
              <tr className="text-gray-700">
                <td className="py-3 w-1/7 text-center">Software Engineer</td>
                <td className="py-3 w-1/7 text-center">Tech Company</td>
                <td className="py-3 w-1/7 text-center">Remote</td>
                <td className="py-3 w-1/7 text-center">Full-time</td>
                <td className="py-3 w-2/7 text-center">
                  We are looking for a Software Engineer solutions.
                </td>
                <td className="py-3 w-1/7 text-center">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline ml-4">
                    Delete
                  </button>
                </td>
              </tr>
              {createdJobsByEmp.map((job, index) => {
                return (
                  <tr key={index} className="text-gray-700">
                    <td className="py-3 px-4 text-center truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                      {job.jobTitle}
                    </td>
                    <td className="py-3 px-4 text-center truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                      {job.companyName}
                    </td>
                    <td className="py-3 px-4 text-center truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                      {job.location}
                    </td>
                    <td className="py-3 px-4 text-center truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                      {job.jobType}
                    </td>
                    <td className="py-3 px-4 text-center truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                      {job.description}
                    </td>
                    <td className="py-3 px-4 text-center truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline ml-4">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CreatedJobTable;
