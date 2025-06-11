import React from 'react'
import { FaSearch } from "react-icons/fa"; // search icon


const SearchJob = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10 mb-9 bg-white">
      <div className=" text-6xl text-center">
        {" "}
        <p className="inline mb-5 text-gray-700 font-semibold ">
          Search, Apply & Get <br /> Your{" "}
          <span className="text-blue-500 hover:text-blue-700 transition-colors duration-200 ">
            Dream Jobs
          </span>
        </p>
      </div>

      <div className="w-1/2 flex items-center bg-white border-2 border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500 m-auto mt-10">
        <input
          type="text"
          placeholder="Find jobs here... (React dev., MERN Stack, etc.)"
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#E0C163] hover:bg-yellow-500 text-white transition-colors duration-200 mr-1 rounded-md"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchJob