import Jumbotron from "../../../components/User/Dashboard/Jumbotron"
import Navbar from "../../../components/User/Dashboard/Navbar"
import TopNavbar from "../../../components/User/Dashboard/TopNavbar"
import Info from "../../../components/User/Dashboard/Info"

const Dashboard = () => {
  return (
    <>
    <div className="relative h-[100vh] ">
      <TopNavbar/>
      <Navbar/>
      <div className="bg-transparent w-full ">
       <Jumbotron/>
       <Info/>
      </div>
    </div>
    </>
  )
}

export default Dashboard
