import React, { useState, useEffect } from "react";

const CreatedJobTable = () => {
  const [
    
    
    createdJobsByEmp, setcreatedJobsByEmp] = useState([]);

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
      setcreatedJobsByEmp(res.data.CreatedJobs);
      console.log(res.data.CreatedJobs, "Created jobs fetched successfully");
      console.log(createdJobsByEmp, "Created jobs by emp");
    } catch (error) {}
  };

  useEffect(() => {
    createdJobs();
  }, []);

  return (
    <div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-8 mb-8">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 w-1/7 text-center">Job Title</th>
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
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-4">
                Delete
              </button>
            </td>
          </tr>
          {createdJobsByEmp.map((job) => {
            return (
              <tr className="text-gray-700">
                <td className="py-3 w-1/7 text-center">{job.jobTitle}</td>
                <td className="py-3 w-1/7 text-center">{job.companyName}</td>
                <td className="py-3 w-1/7 text-center">{job.location}</td>
                <td className="py-3 w-1/7 text-center">{job.jobType}</td>
                <td className="py-3 w-2/7 text-center">{job.description}</td>
                <td className="py-3 w-1/7 text-center">
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
    </div>
  );
};

export default CreatedJobTable;
