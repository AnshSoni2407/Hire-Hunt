import React, { useState, useRef, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative p-2 flex items-center justify-between bg-white shadow-md">
      {/* Logo */}
      <div className="w-32 h-12 flex rounded-3xl overflow-hidden">
        <img
          src="/download.png"
          alt="Logo"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-10 text-xl font-semibold text-gray-600">
        <div className="hover:underline cursor-pointer">Home</div>
        <div className="hover:underline cursor-pointer">Jobs</div>
        <div className="hover:underline cursor-pointer">Contact Us</div>
      </div>

      {/* Account & Hamburger */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 border-1 border-gray-300 rounded-lg p-1 bg-white cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="h-9 w-9 text-center bg-black text-[#E0C163] font-semibold text-2xl rounded-full">
            A
          </div>
          <HiOutlineMenu className="text-2xl text-gray-600" />
        </div>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50 overflow-hidden ">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
              <p>Edit Profile</p> <FaEdit />
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
              Logout <IoLogOut className="inline" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
