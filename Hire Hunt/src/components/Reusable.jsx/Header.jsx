import React, { useState, useRef, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import Footer from "./Footer";

const Header = () => {
  const role = localStorage.getItem("role");
  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp"));
  const userName = loggedInEmp.name;
  const userId = loggedInEmp.id;
  const userPhone = loggedInEmp.phone;
  const password = loggedInEmp.password;
  const profileLogo = loggedInEmp.name.charAt(0).toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);
  const [contactUs, setcontactUs] = useState(false);
  const [openEditForm, setopenEditForm] = useState(false);
  const [updatedName, setupdatedName] = useState(userName)
  const [updatedPhone, setupdatedPhone] = useState(userPhone);
  const [updatedPassword, setupdatedPassword] = useState(password);
  const [showReloginModel, setshowReloginModel] = useState(false);


  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const HandleLogout = async () => {
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
  };


  // if user wants to edit his profile
  const handleEditProfile = async(e) => {
    e.preventDefault();


    const data = {
      name: updatedName,
      phone: updatedPhone,
      password: updatedPassword
    };
    try {
     const res = await  axios.patch(`http://localhost:3000/auth/user/editProfile/${userId}`, data);

if (res.status == 200) {
  console.log('successfully updated profile');
  setshowReloginModel(true);
  setopenEditForm(false);
}
    } catch (error) {
      console.log(`Error updating profile: ${error.message}`);
    }
  };
useEffect(() => {
  document.body.style.overflow = openEditForm ? "hidden" : "auto";
  return () => (document.body.style.overflow = "auto");
}, [openEditForm]);
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
        <div
          onClick={() => {
            setcontactUs(true);
          }}
          className="hover:underline cursor-pointer"
        >
          Contact Us
        </div>

        {role == "employer" ? (
          <Link to={"/createdJobsTable"}>
            <div className="hover:underline cursor-pointer">Created Jobs </div>
          </Link>
        ) : (
          <div
            onClick={() => navigate("/saveJobsPage")}
            className="hover:underline cursor-pointer"
          >
            Saved Job
          </div>
        )}

        {role == "employer" ? (
          <div className="hover:underline cursor-pointer">Applicants </div>
        ) : (
          <div className="hover:underline cursor-pointer">Applied Jobs </div>
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
            <div
              onClick={() => setopenEditForm(true)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
            >
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

        {contactUs && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between bg-black text-[#E0C163] p-4 shadow-lg w-full">
              <button
                onClick={() => setcontactUs(false)}
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
              >
                <MdArrowBack />
              </button>
              <h1 className="text-3xl font-semibold">Contact Us</h1>
              <button
                onClick={() => setcontactUs(false)}
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Split Section */}
            <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
              {/* Left Half - Contact Info */}
              <div className="w-full md:w-1/2 flex items-center justify-center p-10">
                <div className="text-center space-y-6 text-gray-800">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">
                      📧 Email
                    </h2>
                    <p className="text-lg">hirehunt@support.com</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">
                      📞 Phone
                    </h2>
                    <p className="text-lg">+91 98765 43210</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">
                      📍 Location
                    </h2>
                    <p className="text-lg">Dehradun, India</p>
                  </div>
                </div>
              </div>
              {/* right Half - Empty */}
              <div className="border-5 border-[#E0c163] flex-1  bg-black text-[#E0C163] flex items-center justify-center text-center p-10 text-6xl font-semibold hover:bg-[#E0c163] hover:text-black hover:border-black tracking-wide">
                CONTACT US !! <br /> WE ARE HERE TO HELP YOU 24 * 7
              </div>
            </div>
          </div>
        )}

        {openEditForm && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between bg-black text-[#E0C163] p-4 shadow-lg w-full">
              <button
                onClick={() => setopenEditForm(false)}
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
              >
                <MdArrowBack />
              </button>
              <h1 className="text-3xl font-semibold">Edit Profile</h1>
              <button
                onClick={() => setopenEditForm(false)}
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Form Body */}
            <div className="flex justify-center items-center min-h-[80%] p-4 bg-gray-50">
              <form
                onSubmit={handleEditProfile}
                className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg space-y-6"
              >
                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-1">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={updatedName}
                    onChange={(e) => setupdatedName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    required
                    type="number"
                    value={updatedPhone}
                    onChange={(e) => setupdatedPhone(e.target.value)}
                    placeholder="Enter your Phone Number"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-1">
                    New Password
                  </label>
                  <input
                    required
                    type="password"
                    value={updatedPassword}
                    onChange={(e) => setupdatedPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-[#E0C163] font-semibold py-3 rounded hover:bg-[#E0C163] hover:text-black transition"
                >
                  Submit
                </button>
              </form>
            </div>

            <Footer />
          </div>
        )}

        {showReloginModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 max-w-sm">
              <h2 className="text-xl font-semibold text-gray-800">
                Profile Updated Successfully
              </h2>
              <p className="text-gray-600">Please login again to continue.</p>
              <button
                onClick={() => {
                  setshowReloginModel(false);
                  navigate("/"); // go to login
                }}
                className="mt-2 bg-black text-[#E0C163] px-4 py-2 rounded hover:bg-[#E0C163] hover:text-black transition"
              >
                Login Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
