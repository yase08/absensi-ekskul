
import TopLay from "../../../components/User/Layouts/TopLay"
import Jumbotron from "../../../components/User/Gallery/Jumbotron"

const Gallery = () => {
  return (
    <>
    <div className="relative h-auto bg-[#ECF4FF]">
      <TopLay/>
      <Jumbotron/>
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

export default Gallery
