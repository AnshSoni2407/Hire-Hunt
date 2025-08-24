// import React, { useEffect, useState } from "react";
// import { MdOutlineBookmarkAdd } from "react-icons/md";
// import { GiModernCity, GiTakeMyMoney } from "react-icons/gi";
// import { IoLocation, IoPeopleSharp } from "react-icons/io5";
// import { HiBuildingOffice2 } from "react-icons/hi2";
// import axios from "axios";
// import ExpandedCard from "./ExpandedCard.jsx";

// const JobCards = ({ jobs }) => {
//   const [cardExpand, setcardExpand] = useState(false);
//   const [selectedJob, setselectedJob] = useState(null);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [toggle, setToggle] = useState(false);

//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInEmp"))?.id;

//   const closeExpandedCard = () => {
//     setcardExpand(false);
//   };

//   const fetchSavedJobs = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/job/fetch/savedJobs/${loggedInUser}`
//       );
//       setSavedJobs(res.data.SavedJobs);
//     } catch (error) {
//       console.log("Error fetching saved jobs:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchSavedJobs();
//   }, [toggle]);

//   const isJobSaved = (jobId) => {
//     return savedJobs.some((savedJob) => savedJob._id === jobId);
//   };

//   const handleSavedJob = async (jobId) => {
//     try {
//       await axios.post(
//         `http://localhost:3000/job/savedJobs/${jobId}/${loggedInUser}`
//       );
//       setToggle((prev) => !prev);
//     } catch (error) {
//       console.log(`Error saving job: ${error.message}`);
//     }
//   };

//   const handleRemoveJob = async (jobId) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/job/removeSavedJob/${jobId}/${loggedInUser}`
//       );
//       setToggle((prev) => !prev);
//     } catch (error) {
//       console.log(`Error removing job: ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex flex-wrap justify-center">
//       {cardExpand && (
//         <ExpandedCard closeExpand={closeExpandedCard} job={selectedJob} />
//       )}

//       {jobs.map((job) => (
//         <div
//           key={job._id}
//           className="w-80 h-[250px] bg-[#fff4d4] rounded-2xl p-3 m-2 hover:scale-105 duration-300 hover:bg-[#ffefb9] shadow-sm shadow-[#E0C163] hover:shadow-lg hover:shadow-[#E0C163]"
//         >
//           <h2 className="font-bold text-3xl text-center overflow-hidden truncate">
//             {job.jobTitle}
//           </h2>

//           <h3 className="mb-4 font-semibold text-sm truncate text-gray-500 overflow-hidden">
//             <HiBuildingOffice2 className="inline overflow-hidden" /> :{" "}
//             {job.companyName}
//           </h3>

//           <div className="flex justify-between mb-4">
//             <h4>
//               <IoLocation className="inline text-xl truncate overflow-hidden" />{" "}
//               : {job.location}
//             </h4>
//             <div>
//               <GiModernCity className="inline text-xl" /> :
//               <p className="inline font-semibold truncate overflow-hidden">
//                 {job.jobType}
//               </p>
//             </div>
//           </div>

//           <div className="flex justify-between mb-4">
//             <h2>
//               <GiTakeMyMoney className="inline text-xl" />:
//               <p className="inline font-semibold truncate ">{job.salary} LPA</p>
//             </h2>

//             <div>
//               <IoPeopleSharp className="inline text-xl" />:
//               <p className="inline font-semibold truncate overflow-hidden">
//                 {job.experience}
//               </p>
//             </div>
//           </div>

//           <div className="flex justify-evenly mt-9">
//             <button
//               onClick={() => {
//                 setcardExpand(true);
//                 setselectedJob(job);
//               }}
//               className="w-[75%] border-1 border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-center text-lg hover:bg-[#E0C163] hover:text-black duration-300 cursor-pointer"
//             >
//               View Details
//             </button>

//             <button
//               onClick={() => {
//                 isJobSaved(job._id)
//                   ? handleRemoveJob(job._id)
//                   : handleSavedJob(job._id);
//               }}
//               className={`w-[15%] flex items-center justify-center rounded-lg p-1.5 text-2xl duration-300 text-center cursor-pointer ${
//                 isJobSaved(job._id)
//                   ? "bg-green-600 text-white hover:bg-green-700"
//                   : "bg-black text-[#E0C163] hover:bg-[#E0C163] hover:text-black"
//               }`}
//             >
//               <MdOutlineBookmarkAdd />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JobCards;


import React, { useEffect, useState, useCallback } from "react";
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { GiModernCity, GiTakeMyMoney } from "react-icons/gi";
import { IoLocation, IoPeopleSharp } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import axios from "axios";
import ExpandedCard from "./ExpandedCard.jsx";

const JobCards = ({ jobs }) => {
  const [cardExpand, setcardExpand] = useState(false);
  const [selectedJob, setselectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInEmp"))?.id;

  const closeExpandedCard = () => {
    setcardExpand(false);
  };

  const fetchSavedJobs = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/job/fetch/savedJobs/${loggedInUser}`
      );
      setSavedJobs(res.data.SavedJobs);
    } catch (error) {
      console.log("Error fetching saved jobs:", error.message);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const isJobSaved = (jobId) => {
    return savedJobs.some((savedJob) => savedJob._id === jobId);
  };

  const handleToggleSave = async (jobId) => {
    try {
      if (isJobSaved(jobId)) {
        await axios.delete(
          `http://localhost:3000/job/removeSavedJob/${jobId}/${loggedInUser}`
        );
      } else {
        await axios.post(
          `http://localhost:3000/job/savedJobs/${jobId}/${loggedInUser}`
        );
      }
      fetchSavedJobs();
    } catch (error) {
      console.log("Error toggling saved job:", error.message);
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
          className="w-65 lg:w-72 bg-[#fff4d4] rounded-2xl p-3 m-3 flex flex-col justify-between hover:scale-105 duration-300 hover:bg-[#ffefb9] shadow-md shadow-[#E0C163]"
        >
          {/* Title */}
          <h2 className="font-bold text-2xl text-center truncate mb-1">
            {job.jobTitle}
          </h2>

          {/* Company */}
          <h3 className="font-medium text-sm text-gray-600 truncate mb-2">
            <HiBuildingOffice2 className="inline mr-1" />: {job.companyName}
          </h3>

          {/* Location + Type */}
          <div className="flex justify-between text-sm mb-2">
            <p className="truncate max-w-[48%]">
              <IoLocation className="inline mr-1" />: {job.location}
            </p>
            <p className="truncate max-w-[48%]">
              <GiModernCity className="inline mr-1" />: {job.jobType}
            </p>
          </div>

          {/* Salary + Experience */}
          <div className="flex justify-between text-sm mb-2">
            <p className="truncate max-w-[48%]">
              <GiTakeMyMoney className="inline mr-1" />: {job.salary} LPA
            </p>
            <p className="truncate max-w-[48%]">
              <IoPeopleSharp className="inline mr-1" />: {job.experience}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                setcardExpand(true);
                setselectedJob(job);
              }}
              className="w-[75%] border border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-sm hover:bg-[#E0C163] hover:text-black duration-300"
            >
              View Details
            </button>

            <button
              onClick={() => handleToggleSave(job._id)}
              className={`w-[18%] flex items-center justify-center rounded-lg p-2 text-2xl duration-300 ${
                isJobSaved(job._id)
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-black text-[#E0C163]  hover:bg-[#E0C163] hover:text-black"
              }`}
            >
              {isJobSaved(job._id) ? (
                <MdBookmarkAdded />
              ) : (
                <MdOutlineBookmarkAdd />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
