
import Navbar from "../../../components/User/Dashboard/Navbar"
import TopNavbar from "../../../components/User/Dashboard/TopNavbar"
import Info from "../../../components/User/Dashboard/Info"
import TopLay from "../../../components/User/Layouts/TopLay"
import Jumbotron from "../../../components/User/Dashboard/Jumbotron"
import Nextinfo from "../../../components/User/Dashboard/nextinfo"
import List from "../../../components/User/Dashboard/List"

const Dashboard = () => {
  return (
    <>
    <div className="relative h-auto bg-[#ECF4FF]">
      <TopLay/>
      <Jumbotron/>
      <List/>
      <Info/>
      {/* <TopNavbar/>
      <Navbar/>
      <div className="bg-transparent w-full mt-[100px] relative">
       <Jumbotron/>
       <Info/>
      </div> */}
    </div>
    </>
  )
}

export default Dashboard
