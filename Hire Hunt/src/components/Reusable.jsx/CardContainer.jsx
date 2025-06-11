import React from "react";
import JobCards from "./JobCards";

const CardContainer = () => {
  return (
    <div className="p-6">
      <h2 className="text-center text-4xl text-[#c8ac5a] bg-black p-1 rounded-lg ">
        {" "}
        FEATURED JOBS
      </h2>
      <div className="flex flex-wrap ju gap-6 mt-6 justify-evenly">
        
     
      
        <JobCards />
      </div>
    </div>
  );
};

export default CardContainer;
