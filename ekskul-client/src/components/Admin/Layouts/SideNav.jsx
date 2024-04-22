import { AiFillFire } from "react-icons/ai";
// import {FiInfo} from 'react-icons/fi'
import { SiGoogleclassroom } from "react-icons/si";
import { BiPhotoAlbum } from "react-icons/bi";
import { HiOutlineChevronDown } from "react-icons/hi";
// import { PiCardsLight} from 'react-icons/pi'
import { GiBasketballBall, GiTeacher } from "react-icons/gi";
import { BsCalendar3, BsRobot } from "react-icons/bs";
import { FaBarsProgress } from "react-icons/fa6";
import { PiStudentFill, PiDoorOpen } from "react-icons/pi";
// import {MdGamepad, MdManageAccounts} from 'react-icons/md'
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { BsJoystick } from "react-icons/bs";
import { IoDiamondSharp } from "react-icons/io5";
import { WiDayCloudy } from "react-icons/wi";
import { GrTask } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { MdCoPresent, MdOutlineAssessment } from "react-icons/md";
import Button from "../../../components/Admin/Layouts/Button";
import useAuth from "../../../hooks/useAuth";
// import ColorSettingForm from './ColorSettingForm'

// eslint-disable-next-line react/prop-types
const SideNav = ({
  expanded,
  toggleExpansion,
  changeNavbar,
  toggleOpenHelpNav,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { auth } = useAuth();

  const [dataDropdownVisible, setDataDropdownVisible] = useState(false);
  const [hoverdataDropdownVisible, setHoverDataDropdownVisible] =
    useState(false);

  const toggleDataDropdown = () => {
    setDataDropdownVisible(!dataDropdownVisible);
  };

  const handleMouseEnter = () => {
    if (expanded) {
      setHoverDataDropdownVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (expanded) {
      setHoverDataDropdownVisible(false);
    }
  };

  const handleDropdownMouseEnterData = () => {
    if (expanded) {
      setHoverDataDropdownVisible(true);
    }
  };

  const handleDropdownMouseLeaveData = () => {
    if (expanded) {
      setHoverDataDropdownVisible(false);
    }
  };

  const [managementDropdownVisible, setManagementDropdownVisible] =
    useState(false);
  const [hovermanageDropdownVisible, setHoverManageDropdownVisible] =
    useState(false);

  const toggleManagementDropdown = () => {
    if (!expanded) {
      setManagementDropdownVisible(!managementDropdownVisible);
    }
  };

  const handleMouseEnterManage = () => {
    if (expanded) {
      setHoverManageDropdownVisible(true);
    }
  };

  const handleMouseLeaveManage = () => {
    if ((!hovermanageDropdownVisible, expanded)) {
      setHoverManageDropdownVisible(false);
    }
  };
  const handleDropdownMouseEnter = () => {
    if (expanded) {
      setHoverManageDropdownVisible(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (expanded) {
      setHoverManageDropdownVisible(false);
    }
  };

  const [infoHomeNavbar, setInfoHomeNavbar] = useState(false);

  const handleNavbarHomeMouseEnter = () => {
    if (expanded) {
      setInfoHomeNavbar(true);
    }
  };

  const handleNavbarHomeMouseLeave = () => {
    if (expanded) {
      setInfoHomeNavbar(false);
    }
  };
  const [infoHome2Navbar, setInfoHome2Navbar] = useState(false);

  const handleNavbarHomeMouseEnter2 = () => {
    if (expanded) {
      setInfoHome2Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave2 = () => {
    if (expanded) {
      setInfoHome2Navbar(false);
    }
  };

  const [infoHome3Navbar, setInfoHome3Navbar] = useState(false);

  const handleNavbarHomeMouseEnter3 = () => {
    if (expanded) {
      setInfoHome3Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave3 = () => {
    if (expanded) {
      setInfoHome3Navbar(false);
    }
  };
  const [infoHome4Navbar, setInfoHome4Navbar] = useState(false);

  const handleNavbarHomeMouseEnter4 = () => {
    if (expanded) {
      setInfoHome4Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave4 = () => {
    if (expanded) {
      setInfoHome4Navbar(false);
    }
  };
  const [infoHome5Navbar, setInfoHome5Navbar] = useState(false);

  const handleNavbarHomeMouseEnter5 = () => {
    if (expanded) {
      setInfoHome5Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave5 = () => {
    if (expanded) {
      setInfoHome5Navbar(false);
    }
  };
  const [infoHome6Navbar, setInfoHome6Navbar] = useState(false);

  const handleNavbarHomeMouseEnter6 = () => {
    if (expanded) {
      setInfoHome6Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave6 = () => {
    if (expanded) {
      setInfoHome6Navbar(false);
    }
  };
  const [infoHome7Navbar, setInfoHome7Navbar] = useState(false);

  const handleNavbarHomeMouseEnter7 = () => {
    if (expanded) {
      setInfoHome7Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave7 = () => {
    if (expanded) {
      setInfoHome7Navbar(false);
    }
  };
  const [infoHome8Navbar, setInfoHome8Navbar] = useState(false);

  const handleNavbarHomeMouseEnter8 = () => {
    if (expanded) {
      setInfoHome8Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave8 = () => {
    if (expanded) {
      setInfoHome8Navbar(false);
    }
  };
  const [infoHome9Navbar, setInfoHome9Navbar] = useState(false);

  const handleNavbarHomeMouseEnter9 = () => {
    if (expanded) {
      setInfoHome9Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave9 = () => {
    if (expanded) {
      setInfoHome9Navbar(false);
    }
  };
  const [infoHome10Navbar, setInfoHome10Navbar] = useState(false);

  const handleNavbarHomeMouseEnter10 = () => {
    if (expanded) {
      setInfoHome10Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave10 = () => {
    if (expanded) {
      setInfoHome10Navbar(false);
    }
  };
  const [infoHome11Navbar, setInfoHome11Navbar] = useState(false);

  const handleNavbarHomeMouseEnter11 = () => {
    if (expanded) {
      setInfoHome11Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave11 = () => {
    if (expanded) {
      setInfoHome11Navbar(false);
    }
  };
  const [infoHome12Navbar, setInfoHome12Navbar] = useState(false);

  const handleNavbarHomeMouseEnter12 = () => {
    if (expanded) {
      setInfoHome12Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave12 = () => {
    if (expanded) {
      setInfoHome12Navbar(false);
    }
  };
  const [infoHome13Navbar, setInfoHome13Navbar] = useState(false);

  const handleNavbarHomeMouseEnter13 = () => {
    if (expanded) {
      setInfoHome13Navbar(true);
    }
  };

  const handleNavbarHomeMouseLeave13 = () => {
    if (expanded) {
      setInfoHome13Navbar(false);
    }
  };

  return (
    <div>
      {expanded && (
        <div
          className={` absolute h-[150px] border-b hidden border-gray-600 z-50 w-full bg-white ${
            expanded ? "lg:hidden" : "lg:hidden"
          }`}
        >
          <button
            onClick={toggleExpansion}
            className=" z-50 absolute capitalize font-poppins mt-[10px] cursor-pointer ml-[10px] font-bold"
          >
            close
          </button>
          <div className="flex bg-transparent items-center absolute justify-center w-full h-full">
            <h1 className="font-poppins text-3xl uppercase">
              Dalam Perbaikan Error males benerinnya
            </h1>
          </div>
        </div>
      )}
      <nav
        className={`bg-white max-lg:border-r h-[100vh] z-50 transition-all duration-[700ms] fixed   ${
          expanded
            ? "max-lg:w-[320px] lg:w-[65px] "
            : "max-lg:w-0 overflow-y-scroll hidden-scroll  lg:w-[320px]"
        }`}
      >
        <Button toggleExpansion={toggleExpansion} expanded={expanded} />
        <div className="max-lg:overflow-hidden ">
          <ul className="w-full bg-transparent flex justify-center items-center h-[72px]">
            <button
              onClick={toggleExpansion}
              className={`cursor-pointer uppercase font-semibold opacity-75 font antialiased tracking-[2px] font-poppins ${
                expanded ? "lg:hidden" : "max-lg:hidden"
              }`}
            >
              Eksul
            </button>

            <h1
              className={`uppercase font-semibold opacity-75 font antialiased tracking-[2px] font-poppins ${
                expanded ? "max-lg:hidden" : "max-lg:hidden lg:hidden"
              }`}
            >
              ek
            </h1>
          </ul>
          <ul
            className={`${expanded ? " max-lg:px-5  " : "px-5 max-lg:hidden"}`}
          >
            <p
              className={`uppercase font-normal text-xs antialiased tracking-[1.5px] font-poppins opacity-40  ${
                expanded ? "lg:hidden" : ""
              }`}
            >
              dashboard
            </p>
            <div className="my-[15px]">
              <div
                className={`flex flex-col gap-y-[13px] relative  ${
                  expanded
                    ? "px-1 max-lg:px-4"
                    : "w-full h-[55px] flex justify-center px-4"
                }`}
              >
                <Link
                  to="/admin/dashboard"
                  onMouseEnter={handleNavbarHomeMouseEnter}
                  onMouseLeave={handleNavbarHomeMouseLeave}
                  className={`flex gap-x-[24.5px] items-center before:absolute  ${
                    currentPath === "/admin/dashboard" ||
                    currentPath === "/admin/dashboard/"
                      ? expanded
                        ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 before:bg-primary before:-left-[20px]"
                        : "before:w-[4px] before:h-5 before:bg-primary before:-left-[20px]  "
                      : "w-full h-[50px]"
                  } ${
                    expanded
                      ? "items-center lg:justify-center animate-fade-in-out"
                      : ""
                  }`}
                >
                  <AiFillFire
                    className={`opacity-100 ${
                      expanded
                        ? currentPath === "/"
                          ? "text-2xl opacity-100 text-white"
                          : "text-2xl opacity-60 text-black"
                        : "opacity-60"
                    }`}
                  />
                  <p
                    to=""
                    className={`opacity-60 text-sm ${
                      expanded ? "lg:hidden" : ""
                    } transition-opacity`}
                  >
                    Home
                  </p>
                </Link>
                {infoHomeNavbar && (
                  <div
                    className={`absolute w-auto  h-full bg-transparent  text-white flex items-center left-[75px] ${
                      expanded ? "max-lg:hidden" : "hidden"
                    }`}
                  >
                    <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                      <p className="font-semibold font-poppins text-sm z-50">
                        Home
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ul>

          <ul
            className={`relative bg-transparent ${
              expanded ? "mb-[30px]" : " max-lg:hidden"
            }`}
          >
            <p
              className={`uppercase font-normal text-xs max-lg:mx-5 antialiased tracking-[1.5px] font-poppins opacity-40 ${
                expanded ? "lg:hidden" : "mx-5"
              }`}
            >
              Users
            </p>
            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <button
                    onClick={toggleDataDropdown}
                    className={`relative flex items-center justify-between   ${
                      currentPath === "/admin/rayon" ||
                      currentPath === "/admin/rayon/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[50px] "
                    } ${
                      currentPath === "/admin/rombel" ||
                      currentPath === "/admin/rombel/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[50px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <SiGoogleclassroom
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Tingkatan
                      </p>
                    </div>
                    <div className={`${expanded ? "lg:hidden" : ""}`}>
                      <HiOutlineChevronDown className="text-md opacity-60" />
                    </div>
                  </button>
                </div>
                <div
                  onMouseEnter={handleDropdownMouseEnterData}
                  onMouseLeave={handleDropdownMouseLeaveData}
                  className={`absolute top-0 bg-transparent left-[65px] pl-[10px] ${
                    expanded ? "" : "hidden"
                  } ${hoverdataDropdownVisible ? "max-lg:hidden" : ""}`}
                >
                  {hoverdataDropdownVisible && (
                    <div className=" bg-white text-black w-[200px] rounded-md h-auto py-[20px]">
                      <p className="opacity-60 text-sm  font-bold pb-5 border-b-[1px] border-black border-opacity-30 px-[20px]">
                        Tingkatan
                      </p>
                      <Link
                        to="/admin/rombel"
                        className={`py-[15px] flex gap-x-[24.5px] hover:text-primary items-center px-[20px] before:absolute `}
                      >
                        <p
                          to=""
                          className={`opacity-60 text-sm transition-opacity`}
                        >
                          Rombel{" "}
                        </p>
                      </Link>
                      <Link
                        to="/admin/rayon"
                        className={`flex gap-x-[24.5px] items-center hover:text-primary px-[20px] before:absolute py-[15px] `}
                      >
                        <p
                          to=""
                          className={`opacity-60 text-sm transition-opacity`}
                        >
                          Rayon
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              className={`${expanded ? "lg:hidden" : ""} ${
                hoverdataDropdownVisible ? "" : ""
              } `}
            >
              {dataDropdownVisible && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  className={`text-black mx-[45px] bg-transparent border-l-[1px] border-opacity-60 border-black before:w-20 before:h-20 before:bg-black   `}
                >
                  <div className={`flex flex-col bg-transparent `}>
                    <Link
                      to="/admin/rombel"
                      className={` py-[15px] flex gap-x-[24.5px] items-center before:absolute ${
                        expanded
                          ? "items-center justify-center max-lg:justify-start max-lg:pl-[35px] animate-fade-in-out"
                          : "px-[30px]"
                      }`}
                    >
                      <IoDiamondSharp className={`opacity-60 `} />
                      <p
                        to=""
                        className={`opacity-60 text-sm ${
                          expanded ? "" : ""
                        } transition-opacity`}
                      >
                        Rombel
                      </p>
                    </Link>
                    <Link
                      to="/admin/rayon"
                      className={`flex gap-x-[24.5px] items-center before:absolute py-[15px] ${
                        expanded
                          ? "items-center justify-center max-lg:justify-start max-lg:pl-[35px] animate-fade-in-out"
                          : "px-[30px]"
                      }`}
                    >
                      <BsJoystick className={`opacity-60`} />
                      <p
                        to=""
                        className={`opacity-60 text-sm ${
                          expanded ? "" : ""
                        } transition-opacity`}
                      >
                        Rayon
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/ekstrakurikuler"
                    onMouseEnter={handleNavbarHomeMouseEnter3}
                    onMouseLeave={handleNavbarHomeMouseLeave3}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/ekstrakurikuler" ||
                      currentPath === "/admin/ekstrakurikuler/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] max-lg:before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/ekstrakurikuler" ||
                      currentPath === "/admin/ekstrakurikuler/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <GiBasketballBall
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Esktrakulikuler
                      </p>
                    </div>
                  </Link>
                  {infoHome3Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Esktrakulikuler{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              className={`flex flex-col gap-y-[13px] relative   ${
                expanded ? "" : "w-full h-[55px] mt-[15px] flex justify-center"
              }`}
            >
              <div
                className={`bg-transparent w-full ${expanded ? "lg:px-1" : ""}`}
              >
                <Link
                  to="/admin/absensi-siswa"
                  onMouseEnter={handleNavbarHomeMouseEnter4}
                  onMouseLeave={handleNavbarHomeMouseLeave4}
                  className={`relative flex items-center    ${
                    currentPath === "/admin/absensi-siswa" ||
                    currentPath === "/admin/absensi-siswa/"
                      ? expanded
                        ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] max-lg:before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                        : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                      : "w-full h-[60px] "
                  } ${
                    currentPath === "/admin/absensi-siswa" ||
                    currentPath === "/admin/absensi-siswa/"
                      ? expanded
                        ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                        : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                      : "w-full h-[60px] "
                  } ${
                    expanded
                      ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                      : "justify-between lg:px-9"
                  }`}
                >
                  <div className="flex gap-x-[24.5px] items-center ">
                    <MdCoPresent
                      className={`opacity-100 ${
                        expanded
                          ? currentPath === "/data"
                            ? "text-2xl opacity-100 text-white"
                            : "text-2xl opacity-60 text-black"
                          : "opacity-60"
                      }`}
                    />
                    <p
                      className={`opacity-60 text-sm ${
                        expanded ? "lg:hidden" : ""
                      } transition-opacity`}
                    >
                      Absensi Siswa
                    </p>
                  </div>
                </Link>
                {infoHome4Navbar && (
                  <div
                    className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                      expanded ? "max-lg:hidden" : "hidden"
                    }`}
                  >
                    <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                      <p className="font-semibold font-poppins text-sm z-50">
                        Absensi{" "}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {auth.role === "instructor" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/penugasan"
                    onMouseEnter={handleNavbarHomeMouseEnter5}
                    onMouseLeave={handleNavbarHomeMouseLeave5}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/penugasan" ||
                      currentPath === "/admin/penugasan/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] max-lg:before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/penugasan" ||
                      currentPath === "/admin/penugasan/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <GrTask
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Penugasan
                      </p>
                    </div>
                  </Link>
                  {infoHome5Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Penilaian{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/jadwal"
                    onMouseEnter={handleNavbarHomeMouseEnter6}
                    onMouseLeave={handleNavbarHomeMouseLeave6}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/jadwal" ||
                      currentPath === "/admin/jadwal/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/jadwal" ||
                      currentPath === "/admin/jadwal/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <BsCalendar3
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Jadwal
                      </p>
                    </div>
                  </Link>
                  {infoHome6Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Jadwal{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/gallery"
                    onMouseEnter={handleNavbarHomeMouseEnter10}
                    onMouseLeave={handleNavbarHomeMouseLeave10}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/gallery" ||
                      currentPath === "/admin/gallery/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/gallery" ||
                      currentPath === "/admin/gallery/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <BiPhotoAlbum
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Galeri
                      </p>
                    </div>
                  </Link>
                  {infoHome10Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Gallery{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/hari"
                    onMouseEnter={handleNavbarHomeMouseEnter7}
                    onMouseLeave={handleNavbarHomeMouseLeave7}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/hari" ||
                      currentPath === "/admin/hari/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/hari" ||
                      currentPath === "/admin/hari/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <WiDayCloudy
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Hari
                      </p>
                    </div>
                  </Link>
                  {infoHome7Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Hari{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {auth.role === "instructor" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/program"
                    onMouseEnter={handleNavbarHomeMouseEnter8}
                    onMouseLeave={handleNavbarHomeMouseLeave8}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/program" ||
                      currentPath === "/admin/program/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/program" ||
                      currentPath === "/admin/program/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <FaBarsProgress
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Program
                      </p>
                    </div>
                  </Link>
                  {infoHome8Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Program{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/siswa"
                    onMouseEnter={handleNavbarHomeMouseEnter9}
                    onMouseLeave={handleNavbarHomeMouseLeave9}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/siswa" ||
                      currentPath === "/admin/siswa/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/siswa" ||
                      currentPath === "/admin/siswa/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <PiStudentFill
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Siswa
                      </p>
                    </div>
                  </Link>
                  {infoHome9Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Siswa{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/ruangan"
                    onMouseEnter={handleNavbarHomeMouseEnter11}
                    onMouseLeave={handleNavbarHomeMouseLeave11}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/ruangan" ||
                      currentPath === "/admin/ruangan/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/ruangan" ||
                      currentPath === "/admin/ruangan/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <PiDoorOpen
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        Ruangan
                      </p>
                    </div>
                  </Link>
                  {infoHome11Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          Ruangan{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div
              className={`flex flex-col gap-y-[13px] relative   ${
                expanded ? "" : "w-full h-[55px] mt-[15px] flex justify-center"
              }`}
            >
              <div
                className={`bg-transparent w-full ${expanded ? "lg:px-1" : ""}`}
              >
                <Link
                  to="/admin/absensi-instruktur"
                  onMouseEnter={handleNavbarHomeMouseEnter12}
                  onMouseLeave={handleNavbarHomeMouseLeave12}
                  className={`relative flex items-center    ${
                    currentPath === "/admin/absensi-instruktur" ||
                    currentPath === "/admin/absensi-instruktur/"
                      ? expanded
                        ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                        : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                      : "w-full h-[60px] "
                  } ${
                    currentPath === "/admin/absensi-instruktur" ||
                    currentPath === "/admin/absensi-instruktur/"
                      ? expanded
                        ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                        : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                      : "w-full h-[60px] "
                  } ${
                    expanded
                      ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                      : "justify-between lg:px-9"
                  }`}
                >
                  <div className="flex gap-x-[24.5px] items-center ">
                    <GiTeacher
                      className={`opacity-100 ${
                        expanded
                          ? currentPath === "/data"
                            ? "text-2xl opacity-100 text-white"
                            : "text-2xl opacity-60 text-black"
                          : "opacity-60"
                      }`}
                    />
                    <p
                      className={`opacity-60 text-sm ${
                        expanded ? "lg:hidden" : ""
                      } transition-opacity`}
                    >
                      Absensi Instruktur
                    </p>
                  </div>
                </Link>
                {infoHome12Navbar && (
                  <div
                    className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                      expanded ? "max-lg:hidden" : "hidden"
                    }`}
                  >
                    <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                      <p className="font-semibold font-poppins text-sm z-50">
                        Instruktur{" "}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {auth.role === "admin" && (
              <div
                className={`flex flex-col gap-y-[13px] relative   ${
                  expanded
                    ? ""
                    : "w-full h-[55px] mt-[15px] flex justify-center"
                }`}
              >
                <div
                  className={`bg-transparent w-full ${
                    expanded ? "lg:px-1" : ""
                  }`}
                >
                  <Link
                    to="/admin/user"
                    onMouseEnter={handleNavbarHomeMouseEnter13}
                    onMouseLeave={handleNavbarHomeMouseLeave13}
                    className={`relative flex items-center    ${
                      currentPath === "/admin/user" ||
                      currentPath === "/admin/user/"
                        ? expanded
                          ? "lg:w-full lg:h-[50px] lg:bg-primary lg:rounded-md before:w-[4px] before:h-5 max-lg:px-9 before:bg-primary before:left-0 before:absolute"
                          : " before:w-[4px] before:h-5  before:bg-primary before:left-0 before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      currentPath === "/admin/user" ||
                      currentPath === "/admin/user/"
                        ? expanded
                          ? "w-full h-[50px] lg:bg-primary max-lg:bg-transparent rounded-md"
                          : "before:w-[4px] before:h-5 before:bg-primary before:left-[0] before:absolute "
                        : "w-full h-[60px] "
                    } ${
                      expanded
                        ? "items-center lg:justify-center animate-fade-in-out max-lg:px-8"
                        : "justify-between lg:px-9"
                    }`}
                  >
                    <div className="flex gap-x-[24.5px] items-center ">
                      <FaRegUser
                        className={`opacity-100 ${
                          expanded
                            ? currentPath === "/data"
                              ? "text-2xl opacity-100 text-white"
                              : "text-2xl opacity-60 text-black"
                            : "opacity-60"
                        }`}
                      />
                      <p
                        className={`opacity-60 text-sm ${
                          expanded ? "lg:hidden" : ""
                        } transition-opacity`}
                      >
                        User
                      </p>
                    </div>
                  </Link>
                  {infoHome13Navbar && (
                    <div
                      className={`absolute w-auto h-full bg-transparent  text-white flex items-center left-[75px] top-0 ${
                        expanded ? "max-lg:hidden" : "hidden"
                      }`}
                    >
                      <div className="bg-black py-[4px] px-[5px] rounded-sm ">
                        <p className="font-semibold font-poppins text-sm z-50">
                          User
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </ul>
        </div>
      </nav>
      {changeNavbar && (
        <button
          onClick={toggleOpenHelpNav}
          className="fixed transition-colors duration-400 hover:bg-gray-400 hover:text-white bg-white border border-gray-400 flex items-center justify-center w-[100px] h-[100px] z-50 bottom-[50px] right-[30px] rounded-full"
        >
          <BsRobot className="text-3xl" />
        </button>
      )}
    </div>
  );
};

export default SideNav;
