import axios from "axios";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const CreateJob = ({closeModal}) => {
const [jobTitle, setjobTitle] = useState('')
const [companyName, setcompanyName] = useState('')
const [location, setlocation] = useState('')
const [jobType, setjobType] = useState('')
const [salary, setsalary] = useState('')
const [experience, setexperience] = useState('')
const [description, setdescription] = useState('')
const [skills, setskills] = useState('')

const data={
  jobTitle,
  companyName,
  location,
  jobType,
  salary,
  experience,
  description,
  skills,
   // Assuming you have the user ID available
}

  const handleSubmit = (e) => {
    e.preventDefault();

   try {
    const res = axios.post("http://localhost:3000/job/create", data);

    console.log("Job created", data);
    // closeModal();
   } catch (error) {
    console.log('Error creating job:', error.message);
   } 
  }
  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4 mt-8">
      <form
        className="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl"
        onSubmit={handleSubmit}
      >
        <div
          className="absolute top-3 right-3 text-2xl font-extrabold cursor-pointer text-gray-700 hover:text-gray-900 transition duration-300"
          onClick={() => {
            closeModal();
          }}
        >
          <IoCloseOutline />
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center text-[#c8ac5a]">
          Create Job
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-lg font-medium mb-1"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              placeholder="e.g. Software Engineer"
              onChange={(e) => {
                setjobTitle(e.target.value);
              }}
              value={jobTitle}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-lg font-medium mb-1"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              placeholder="e.g. Tech Solutions Inc."
              onChange={(e) => {
                setcompanyName(e.target.value);
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
            />
          </div>

          {/* Job Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-medium mb-1"
            >
              Job Location
            </label>
            <input
              type="text"
              placeholder="e.g. Noida, Uttar Pradesh"
              value={location}
              onChange={(e) => {
                setlocation(e.target.value);
              }}
              id="location"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
            />
          </div>

          {/* Job Type (Select) */}
          <div>
            <label htmlFor="jobType" className="block text-lg font-medium mb-1">
              Job Type
            </label>
            <select
              id="jobType"
              value={jobType}
              onChange={(e) => setjobType(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
            >
              <option value="">Select Type</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-lg font-medium mb-1">
              Salary (LPA)
            </label>
            <input
              type="number"
              placeholder="e.g. 5, 10, 15"
              value={salary}
              onChange={(e) => {
                setsalary(e.target.value);
              }}
              id="salary"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label
              htmlFor="experience"
              className="block text-lg font-medium mb-1"
            >
              Experience Level
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => {
                setexperience(e.target.value);
              }}
              id="experience"
              placeholder="Fresher / 1-3 yrs / etc."
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
            />
          </div>
        </div>
        
        <div className="col-span-2 mt-6 mb-6">
          <label
            htmlFor="Skills"
            className="block text-lg font-medium mb-1"
          >
            Skills Required
          </label>
          <textarea
            id="skills"
            value={skills}
            onChange={(e) => {
              setskills(e.target.value);
            }}
            placeholder="HTML, CSS, TAILWIND CSS, REACT, etc."
            rows="4"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
          ></textarea>
        </div>


        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-1"
          >
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            placeholder="Describe the job responsibilities, requirements, etc."
            rows="4"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c8ac5a]"
          ></textarea>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 bg-black text-[#E0C163] font-semibold py-2 rounded hover:bg-[#333] transition duration-300"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
