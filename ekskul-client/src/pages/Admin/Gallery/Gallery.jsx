
import SideNav from "../../../components/Admin/Layouts/SideNav";
import TopNav from "../../../components/Admin/Layouts/TopNav"
import {useState} from "react";
import GalleryComponent from "../../../components/Admin/Gallery/Gallery"
// import Jumbotron from "../../../components/Admin/Jumbotron/Jumbotron";


const Gallery = () => {
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

            <GalleryComponent expanded={expanded}/>
        </div>
    </div>
</>
    )
}

export default Gallery