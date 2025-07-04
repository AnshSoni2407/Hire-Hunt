import React, { useState, useRef, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


const Header = () => {

  const role = localStorage.getItem("role");
  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp"));
  const userName = loggedInEmp.name
  const profileLogo = loggedInEmp.name.charAt(0).toUpperCase()


  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const HandleLogout = async ()=>{

    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("loggedInEmp");
      localStorage.removeItem("role");
      window.location.href = "/";
    } catch (error) {
      console.log(`Error logging out: ${error.message}`);
    }
  }

  return (
    <div className=" relative top-0 p-2 w-full flex items-center justify-between bg-white shadow-md z-2">
      {/* Logo */}

      <img
        src="/download.png"
        alt="Logo"
        className="object-contain w-32  h-12 flex rounded-3xl overflow-hidden"
      />

      {/* Nav Links */}
      <div className="flex items-center gap-10 text-xl font-semibold text-gray-600">
        <div
          className="hover:underline cursor-pointer"
          onClick={() => {
            const section = document.getElementById("featured-jobs");
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          Jobs
        </div>
        <div className="hover:underline cursor-pointer">Contact Us</div>

        {role == "employer" ? (
          <div className="hover:underline cursor-pointer">Created Jobs </div>
        ) : (
          <div
            onClick={() => navigate("/saveJobsPage")}
            className="hover:underline cursor-pointer"
          >
            Saved Job
          </div>
        )}
      </div>

      {/* Account & Hamburger */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 border-1 border-gray-300 rounded-lg p-1 bg-white cursor-pointer"
          onClick={toggleMenu}
        >
          {" "}
          <div className="h-9 w-9 text-center bg-black text-[#E0C163] font-semibold text-2xl rounded-full">
            {profileLogo}
          </div>
          <p>Hii {userName} 👋</p>
          <HiOutlineMenu className="text-2xl text-gray-600" />
        </div>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white  rounded-lg shadow-md z-50 overflow-hidden ">
            <div className="px-4 py-2 m-auto font-extrabold text-center hover:bg-gray-100 cursor-pointer flex items-center justify-between"></div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
              <p>Edit Profile</p> <FaEdit />
            </div>
            <div
              onClick={HandleLogout}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
            >
              Logout <IoLogOut className="inline" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
