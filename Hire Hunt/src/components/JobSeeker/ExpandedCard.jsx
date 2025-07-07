// import React, { useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { IoArrowBack } from "react-icons/io5";
// import Footer from "../Reusable.jsx/Footer.jsx";

// const ExpandedCard = ({ closeExpand, job }) => {
//   const [resume, setResume] = useState(null);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 bg-white overflow-y-auto   shadow-xl">
//       {/* Close Buttons */}
//       <div className=" flex justify-between items-center  p-4  shadow-lg bg-black">
//         <button
//           onClick={closeExpand}
//           className="text-[#c8ac5a] text-2xl bg-black p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300"
//         >
//           <IoArrowBack />
//         </button>{" "}
//         <h1 className="text-4xl text-[#c8ac5a]  p-1 ">Job Details</h1>
//         <button
//           onClick={closeExpand}
//           className="text-[#c8ac5a] text-2xl bg-black p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300"
//         >
//           <IoMdClose />
//         </button>
//       </div>

//       {/* Job Details */}
//       <section className=" flex justify-center items-center">
//         <div className=" flex justify-center items-center bg-gray-100 p-4 w-[50%] text-center ">
//           <div className="space-y-6  text-lg">
//             <Detail label="Job Title" value={job.jobTitle} />
//             <Detail label="Company Name" value={job.companyName} />
//             <Detail label="Location" value={job.location} />
//             <Detail label="Job Type" value={job.jobType} />
//             <Detail label="Experience" value={job.experience} />
//             <Detail label="Salary" value={`${job.salary} LPA`} />
//             <Detail label="Skills" value={job.skills} />
//             <Detail label="Description" value={job.description} />

//             {/* Resume Upload */}
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Upload Resume:</h2>
//               <input
//                 onChange={(e) => setResume(e.target.files[0])}
//                 type="file"
//                 className="block w-full p-2 border border-black rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#E0C163] file:text-black file:font-semibold hover:file:bg-black hover:file:text-[#E0C163] transition"
//               />
//             </div>

//             {/* Apply Button */}
//             <div className="flex justify-center pt-6">
//               <button
//                 disabled={!resume}
//                 className={`w-full md:w-1/2 py-3 rounded-lg text-lg font-semibold transition 
//             ${
//               !resume
//                 ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 : "bg-black text-[#E0C163] hover:bg-[#E0C163] hover:text-black"
//             }`}
//               >
//                 Apply Now
//               </button>
//             </div>
//           </div>
//           <div
//             className="w-1/2 bg-cover bg-center hidden md:block"
//             style={{
//               backgroundImage: `url('/images/backGround.jpg')`, // image from public folder
//             }}
//           ></div>
//         </div>

//         <div className="w-[50%]">HURRY UP !!GRAB THE OPPORTUNITY NOW !!</div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// // Reusable detail section
// const Detail = ({ label, value }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//     <h2 className="font-semibold text-gray-700 min-w-[130px]">{label}:</h2>
//     <p className="text-gray-800 break-words ">{value}</p>
//   </div>
// );

// export default ExpandedCard;


import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import Footer from "../Reusable.jsx/Footer.jsx";

const ExpandedCard = ({ closeExpand, job }) => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center p-4 shadow-lg bg-black">
        <button
          onClick={closeExpand}
          className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-4xl text-[#c8ac5a]">Job Details</h1>
        <button
          onClick={closeExpand}
          className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300"
        >
          <IoMdClose />
        </button>
      </div>

      {/* Main Content */}
      <section className="flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
        {/* Job Details Section */}
        <div className="flex-1 bg-gray-100 p-6 flex items-center justify-center">
          <div className="w-full max-w-xl space-y-6 text-lg">
            <Detail label="Job Title" value={job.jobTitle} />
            <Detail label="Company Name" value={job.companyName} />
            <Detail label="Location" value={job.location} />
            <Detail label="Job Type" value={job.jobType} />
            <Detail label="Experience" value={job.experience} />
            <Detail label="Salary" value={`${job.salary} LPA`} />
            <Detail label="Skills" value={job.skills} />
            <Detail label="Description" value={job.description} />

            {/* Resume Upload */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Upload Resume:</h2>
              <input
                onChange={(e) => setResume(e.target.files[0])}
                type="file"
                className="block w-full p-2 border border-black rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#E0C163] file:text-black file:font-semibold hover:file:bg-black hover:file:text-[#E0C163] transition"
              />
            </div>

            {/* Apply Button */}
            <div className="flex justify-center pt-6">
              <button
                disabled={!resume}
                className={`w-full py-3 rounded-lg text-lg font-semibold transition 
              ${
                !resume
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-[#E0C163] hover:bg-[#E0C163] hover:text-black"
              }`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* HURRY UP Section */}
        <div className="border-5 border-[#E0c163] flex-1 bg-black text-[#E0C163] flex items-center justify-center text-center p-10 text-8xl font-semibold hover:bg-[#E0c163] hover:text-black hover:border-black tracking-wide">
          HURRY UP!! <br /> GRAB THE OPPORTUNITY NOW!!
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Reusable Detail Component
const Detail = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <h2 className="font-semibold text-gray-700 min-w-[130px]">{label}:</h2>
    <p className="text-gray-800 break-words">{value}</p>
  </div>
);

export default ExpandedCard;
