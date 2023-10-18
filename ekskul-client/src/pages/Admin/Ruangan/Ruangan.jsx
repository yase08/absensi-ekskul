
import SideNav from "../../../components/Admin/Layouts/SideNav";
import TopNav from "../../../components/Admin/Layouts/TopNav"
import {useState} from "react";
import RuanganComponent from "../../../components/Admin/Ruangan/Ruangan"
import Tein from "../../../components/Admin/magic/Tein";
import ColorSettingForm from "../../../components/Admin/Layouts/HiddenColor/Navbar";
// import Jumbotron from "../../../components/Admin/Jumbotron/Jumbotron";


const Ruangan = () => {
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

    return (
        <> 
        < div className = "flex overflow-hidden " > 
        <SideNav expanded={expanded} toggleExpansion={toggleExpansion} changeNavbar={changeNavbar} toggleOpenHelpNav={toggleOpenHelpNav}/>

        <div
            className={`w-full transition-all overflow-hidden duration-[700ms] ${expanded
                ? 'lg:ml-[65.5px]'
                : 'lg:ml-[320px]'}`}>
            <TopNav toggleOpenChangeBg={toggleOpenChangeBg} toggleExpansion={toggleExpansion} toggleChangeNavbar={toggleChangeNavbar} expanded={expanded} toggleOpenProfile={toggleOpenProfile}/>
            <RuanganComponent/>
        </div>
        {openHelpNav && (
        <Tein toggleOpenHelpNav={toggleOpenHelpNav} setLoading={setLoading} loading={loading}/>
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

export default Ruangan