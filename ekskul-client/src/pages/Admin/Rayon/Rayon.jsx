
import SideNav from "../../../components/Admin/Layouts/SideNav";
import TopNav from "../../../components/Admin/Layouts/TopNav"
import {useState} from "react";
import RayonComponent from "../../../components/Admin/Rayon/Rayon"
// import Jumbotron from "../../../components/Admin/Jumbotron/Jumbotron";


const Rayon = () => {
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

            <RayonComponent/>
        </div>
    </div>
</>
    )
}

export default Rayon