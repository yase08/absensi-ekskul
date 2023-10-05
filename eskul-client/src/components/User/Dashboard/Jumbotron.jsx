import WhiteLogo from '../../../assets/Logo-white.png'
import BlackLogo from '../../../assets/Logo-black.png'
const Jumbotron = () => {
  return (
<div className="w-full h-[500px] flex max-md:flex-col max-md:flex-no-wrap justify-center relative items-center text-black dark:text-white">
  <ul className='w-full h-full shadow-lg max-md:order-2 max-md:py-[100px]'>
    <div className='w-full h-full flex flex-col items-center justify-center '>
      <h1 className='font-Gabarito font-bold xl:text-5xl max-xl:text-[40px]'>Esktrakulikuler</h1>
      <h1 className='opacity-70 xl:text-xl max-xl:text-[15px] uppercase'>Smk wikrama bogor</h1>
      <button className='border border-black dark:border-white rounded-full px-3 py-2 mt-5 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'>Get Ekstrakulikuler</button>
    </div>
  </ul>
  <ul className='w-full h-full flex flex-col justify-center items-center gap-5 bg-transparent shadow-lg max-md:order-1'>
    <img src={BlackLogo} alt="" className='w-[200px] max-md:w-[150px] dark:hidden block'/>
    <img src={WhiteLogo} alt="" className='w-[200px] max-md:w-[150px] dark:block hidden'/>
  </ul>
</div>


  )
}

export default Jumbotron
