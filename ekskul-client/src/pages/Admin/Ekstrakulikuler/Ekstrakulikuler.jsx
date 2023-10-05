
import SideNav from "../../../components/Admin/Layouts/SideNav";
import TopNav from "../../../components/Admin/Layouts/TopNav"
import {useState} from "react";
import EkstrakulikulerComponent from "../../../components/Admin/Ekstrakulikuler/Ekstrakulikuler"
// import Jumbotron from "../../../components/Admin/Jumbotron/Jumbotron";


const Ekstrakulikuler = () => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <> < div className = "flex overflow-hidden " > <SideNav expanded={expanded} setExpanded={setExpanded}/>
        <div
            className={`w-full transition-all overflow-hidden duration-[700ms] ${expanded
                ? 'lg:ml-[65.5px]'
                : 'lg:ml-[320px]'}`}>
            <TopNav toggleExpansion={toggleExpansion} expanded={expanded}/>

            <EkstrakulikulerComponent/>
        </div>
    </div>
</>
    )
}

export default Ekstrakulikuler