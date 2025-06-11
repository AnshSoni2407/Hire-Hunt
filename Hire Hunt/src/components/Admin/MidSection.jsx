import React, { useState } from "react";
import CreateJob from "./CreateJob.jsx";
import Footer from "../Reusable.jsx/Footer.jsx";
import CreatedJobTable from "./CreatedJobTable.jsx";
import { GoPlus } from "react-icons/go";


const MidSection = () => {
  const [createJobModal, setcreateJobModal] = useState(false);

  return (
    <div>
      <div className="relative text-center bg-black text-[#E0C163] font-semibold text-2xl p-4 mt-8">
        {" "}
        Created Jobs
        <button
          className="absolute right-6 top-[50%] translate-y-[-50%] bg-green-500 rounded-lg cursor-pointer text-white p-1.5"
          onClick={() => {
            setcreateJobModal(true);
          }}
        >
          Add new
          <GoPlus className="inline" />
        </button>{" "}
      </div>

      {createJobModal ? (
        <CreateJob
          closeModal={() => {
            setcreateJobModal(false);
          }}
        />
      ) : (
        <CreatedJobTable />
      )}
    </div>
  );
};

export default MidSection;
