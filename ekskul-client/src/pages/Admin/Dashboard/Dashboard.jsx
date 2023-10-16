import BarChart from "../../../components/Admin/Chart/BarChart";
import Jumbotron from "../../../components/Admin/Jumbotron/Jumbotron";
import SideNav from "../../../components/Admin/Layouts/SideNav";
import Table from "../../../components/Admin/Table/Table";
import TopNav from "../../../components/Admin/Layouts/TopNav"
import {useState} from "react";
import {RiFacebookFill} from 'react-icons/ri'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BsInstagram, BsWhatsapp} from 'react-icons/bs'
import Profile from "../../../components/Admin/Profile/Profile";
import { useNavigate } from 'react-router-dom';
import ColorSettingForm from "../../../components/Admin/Layouts/HiddenColor/Navbar";

const Dashboard = () => {
    const [expanded, setExpanded] = useState(true);
    // Inside your component's state declarations
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


    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
  

    const getMachineLearningSuggestions = async (query) => {
        const suggestions = ['rombel', 'rayon', 'ekstrakulikuler', 'jadwal','program','siswa','gallery', 'ruangan','instruktur'];
        return suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        );
      };
    
      const handleInputChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    
        const suggestions = await getMachineLearningSuggestions(query);
        setSuggestions(suggestions);
      };
    
      const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
      };
    
      const handleButtonClick = async () => {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate(`/admin/${searchQuery}`);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <> 
        <div className = "flex relative" > 
        <SideNav expanded={expanded} toggleExpansion={toggleExpansion} changeNavbar={changeNavbar} toggleOpenHelpNav={toggleOpenHelpNav}/>
        <div
            className={`w-full transition-all overflow-hidden duration-[700ms]  ${expanded
                ? 'lg:ml-[65.5px]'
                : 'lg:ml-[320px]'}`}>
            <TopNav toggleOpenChangeBg={toggleOpenChangeBg} toggleExpansion={toggleExpansion} toggleChangeNavbar={toggleChangeNavbar} expanded={expanded} toggleOpenProfile={toggleOpenProfile}/>
            <Jumbotron expanded={expanded}/>
            <BarChart/>
            <Table/>
            <Profile openProfile={openProfile} toggleOpenProfile={toggleOpenProfile} />
            <div className="mt-[80px] z-40 w-full px-10 bg-transparent bg-opacity-30 h-[100px] relative top-[50px]">
                <div className="bg-white rounded-md w-full h-full relative flex items-center px-5 justify-between overflow-hidden">
                    <div className="flex gap-3 items-center">
                        <img src="http://4.bp.blogspot.com/-FQ5u-thKT-w/Umh6HU1xQnI/AAAAAAAAAMc/w0MTATc8q_A/s1600/Wikrama+PNG.png" alt="" className="w-[50px] h-[50px]" />
                        <div>
                        <p className="uppercase font-Gabarito font-bold text-medium">
                        Sim absensi ekstrakulikuler
                        </p>
                        <p className="capitalize text-opacity-50 text-gray-700">
                        By Murid Smk wikrama bogor
                        </p>
                        </div>
                    </div>
                    <div className="flex gap-x-3 ">
                        <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <RiFacebookFill className="text-white text-xl"/>
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)' }}>
                            <BsInstagram className="text-white text-xl"/>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <BsWhatsapp className="text-white text-xl"/>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                            <AiOutlineTwitter className="text-white text-xl"/>
                        </button>

                    </div>
                </div>
            </div>
            <div className="text-white bg-primary h-[120px] flex items-end relative px-[43px] justify-between pb-5  gap-2">
                <div className="flex gap-x-5 capitalize">
                    <p className="hover:text-yellow-300">@2023 Wikrama Student</p>
                    <p className="hover:text-yellow-300">terms</p>
                    <p className="hover:text-yellow-300">privacy</p>
                </div>
                <button className="border border-white rounded-full p-1 text-sm w-[150px] h-[40px] translate-y-[5px]  hover:bg-white hover:text-blue-500 ">Redirect Landing</button>
                
            </div>
        </div>
        {openHelpNav && (
            <div className="bg-transparent w-full h-full justify-center items-center flex z-50 fixed" style={{ backdropFilter: 'blur(5px)' }}>
                <div className="text-black bg-white border p-3 border-gray-400 w-[400px] h-auto ">
                    <div className=" relative">
                        <div className="text-white">-</div>
                        <button onClick={toggleOpenHelpNav} className="absolute right-0 top-0 "><AiOutlineClose/></button>
                    </div>
                    <div className="flex flex-col gap-[1px]">
                    <input
                  type="text"
                  className="outline-none border p-1 rounded-sm border-gray-400 w-full"
                  placeholder="Where Do You Want To Go"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                  <div className="bg-white border w-full border-gray-400  h-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 p-1 rounded"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                    <button className="bg-blue-500 p-1 w-full text-white rounded-sm" onClick={handleButtonClick}>
                    {loading ? <div className="loader"></div> : 'Tein'}
                    </button>

                    </div>
                </div>
            </div>
        )}
        {openChangeBg && (
         <div className="bg-transparent w-full h-full justify-center items-center flex z-50 fixed" style={{ backdropFilter: 'blur(5px)' }}>
            <div className="text-black bg-white border border-gray-400 w-[400px] h-auto ">
            <ColorSettingForm toggleOpenChangeBg={toggleOpenChangeBg}/>
            </div>
            </div>
        )}
    </div>
</>
    )
}

export default Dashboard