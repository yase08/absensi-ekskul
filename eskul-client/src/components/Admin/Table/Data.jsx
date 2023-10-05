import SideNav from "../Layouts/SideNav"
import TopNav from "../Layouts/TopNav"
import { useState } from "react";



const Data = () => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpansion = () => {
      setExpanded(!expanded);
  };


  
  return (
    <>
    <div className="flex">
        <SideNav expanded={expanded}/>
        <div className="ml-[320px] w-full">
            <TopNav toggleExpansion={toggleExpansion}/>
            <div className="text-yellow-500 h-[999px]">Data</div>
        </div>
    </div>
    </>
  )
}

export default Data