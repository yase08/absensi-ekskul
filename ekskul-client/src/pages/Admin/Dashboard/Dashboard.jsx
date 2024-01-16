import Jumbotron from "../../../components/Admin/Jumbotron/Jumbotron";
import SideNav from "../../../components/Admin/Layouts/SideNav";
import TopNav from "../../../components/Admin/Layouts/TopNav";
import { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
// import Profile from "../../../components/Admin/Profile/Profile";
import ColorSettingForm from "../../../components/Admin/Layouts/HiddenColor/Navbar";
import Tein from "../../../components/Admin/magic/Tein";

const Dashboard = () => {
  useEffect(() => {
    const savedColor = localStorage.getItem("footerBackgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
    } else {
      setBackgroundColor("#6777EF");
    }
  }, []);

  const [backgroundColor, setBackgroundColor] = useState("bg-primary");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const [openProfile, setOpenProfile] = useState(false);

  const toggleOpenProfile = () => {
    setOpenProfile(!openProfile);
  };
  const [changeNavbar, setChangeNavbar] = useState(false);

  const toggleChangeNavbar = () => {
    setChangeNavbar(!changeNavbar);
  };

  const [openHelpNav, setHelpNav] = useState(false);

  const toggleOpenHelpNav = () => {
    setHelpNav(!openHelpNav);
  };

  const [openChangeBg, setOpenChangeBg] = useState(false);

  const toggleOpenChangeBg = () => {
    setOpenChangeBg(!openChangeBg);
  };
  return (
    <>
      <div className="flex relative bg-transparent h-screen w-full justify-between">
        <SideNav
          expanded={expanded}
          toggleExpansion={toggleExpansion}
          changeNavbar={changeNavbar}
          toggleOpenHelpNav={toggleOpenHelpNav}
        />
        <div
          className={`w-full transition-all bg-transparent flex flex-col h-screen overflow-hidden duration-[700ms]  ${
            expanded ? "lg:ml-[65.5px]" : "lg:ml-[320px]"
          }`}
        >
          <TopNav
            toggleOpenChangeBg={toggleOpenChangeBg}
            toggleExpansion={toggleExpansion}
            toggleChangeNavbar={toggleChangeNavbar}
            expanded={expanded}
            toggleOpenProfile={toggleOpenProfile}
          />
          <Jumbotron expanded={expanded} />
          {/* <Profile
            openProfile={openProfile}
            toggleOpenProfile={toggleOpenProfile}
          /> */}
          {/* Sidebar */}
          <div className="flex w-full flex-col bg-transparent">
          <div className="mt-[80px] z-40 w-full px-10  bg-opacity-30 h-[100px]  relative top-[50px] bg-transparent">
            <div className="bg-white rounded-md w-full h-full relative flex items-center px-5 justify-between overflow-hidden">
              <div className="flex gap-3 items-center">
                <img
                  src="http://4.bp.blogspot.com/-FQ5u-thKT-w/Umh6HU1xQnI/AAAAAAAAAMc/w0MTATc8q_A/s1600/Wikrama+PNG.png"
                  alt=""
                  className="w-[50px] h-[50px]"
                />
                <div>
                  <p className="uppercase font-Gabarito font-bold text-medium">
                    Sim absensi ekstrakurikuler
                  </p>
                  <p className="capitalize text-opacity-50 text-gray-700">
                    By Murid Smk wikrama bogor
                  </p>
                </div>
              </div>
              <div className="flex gap-x-3 ">
                <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <RiFacebookFill className="text-white text-xl" />
                </button>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
                  }}
                >
                  <BsInstagram className="text-white text-xl" />
                </button>
                <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <BsWhatsapp className="text-white text-xl" />
                </button>
                <button className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                  <AiOutlineTwitter className="text-white text-xl" />
                </button>
              </div>
            </div>
          </div>
          <div
            className="text-white h-[120px] flex items-end relative px-[43px] justify-between pb-5  gap-2"
            style={{ background: backgroundColor }}
          >
            <div className="flex gap-x-5 capitalize">
              <p className="hover:text-yellow-300">@2023 Wikrama Student</p>
              <p className="hover:text-yellow-300">terms</p>
              <p className="hover:text-yellow-300">privacy</p>
            </div>
            <button className="border border-white rounded-full p-1 text-sm w-[150px] h-[40px] translate-y-[5px]  hover:bg-white hover:text-blue-500 ">
              Redirect Landing
            </button>
          </div>
          </div>
        </div>
        {openHelpNav && (
          <Tein
            toggleOpenHelpNav={toggleOpenHelpNav}
            setLoading={setLoading}
            loading={loading}
          />
        )}
        {openChangeBg && (
          <div
            className="bg-transparent w-full h-full justify-center items-center flex z-50 fixed"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <div className="text-black bg-white border border-gray-400 w-[400px] h-auto ">
              <ColorSettingForm toggleOpenChangeBg={toggleOpenChangeBg} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
