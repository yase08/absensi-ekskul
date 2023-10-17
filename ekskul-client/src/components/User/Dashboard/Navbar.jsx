import LogoBlack from '../../../assets/Logo-black.png'
import LogoWhite from '../../../assets/Logo-white.png'
import DarkModeToggle from './DarkModeToggle'
import {IoHome} from 'react-icons/io5'
import { useLocation } from 'react-router-dom';
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {BiRun} from 'react-icons/bi'
const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    console.log('Current Path:', currentPath);

  return (
    <>
      <nav className="backdrop-blur-md z-50 max-lg:justify-center top-0 fixed max-lg:bottom-0 w-full text-black flex justify-between items-center h-[100px] px-6 transition-all bg-white dark:bg-bad lg:shadow-lg dark:shadow-slate-600 max-lg:shadow-top">
        <ul className="flex gap-x-5 max-lg:gap-x-10 items-center relative font-Gabarito font-medium text-black dark:text-white">
            <li className='max-lg:hidden lg:mr-5'>
            <a href="#" >
                   <img src={LogoBlack} alt="" className='w-[100px] dark:hidden' />
                   <img src={LogoWhite} alt="" className='w-[100px] hidden dark:block' />
                </a>
            </li>
            <li className={`relative max-lg:hidden`}>
                <a href="#" className=" max-lg:hidden opacity-70 dark:opacity-100 bg-transparent before:w-0 hover:before:bottom-0 hover:before:w-full hover:before:bg-black dark:hover:before:bg-white hover:before:absolute hover:before:h-[1px] before:duration-500 before:opacity-70 transition-all ease-in-out">Dashboard</a>
            </li>
            <li className={`relative max-lg:p-[15px] ${currentPath === '/aijsdasda' ? 'max-lg:bg-blue-500 max-lg:text-white  rounded-full' : ''}`}>
                <HiOutlineInformationCircle className='lg:hidden text-[35px]'/>
                <a href="#" className=" max-lg:hidden opacity-70 dark:opacity-100 bg-transparent before:w-0 hover:before:bottom-0 hover:before:w-full hover:before:bg-black dark:hover:before:bg-white hover:before:absolute hover:before:h-[1px] before:duration-500 before:opacity-70 transition-all ease-in-out">Information</a>
            </li>
            <li className={`relative max-lg:p-[15px] lg:hidden bottom-[50px] max-lg:bg-blue-500 max-lg:text-white rounded-full`}>
                <IoHome className='lg:hidden text-[35px]'/>
            </li>
            <li className={`relative max-lg:p-[15px] max-lg:hover:border max-lg:hover:rounded-full max-lg:hover:transition-all max-lg:hover:duration-500 ${currentPath === '/jsandjands' ? 'max-lg:bg-blue-500 max-lg:text-white  rounded-full' : ''}`}>
                <BiRun className='lg:hidden text-[35px]'/>
            <a href="#" className=" max-lg:hidden opacity-70 dark:opacity-100 bg-transparent before:w-0 hover:before:bottom-0 hover:before:w-full hover:before:bg-black dark:hover:before:bg-white hover:before:absolute hover:before:h-[1px] before:duration-500 before:opacity-70 transition-all ease-in-out">Eskul</a>
            </li>
        </ul>
        <ul className="flex gap-x-5 max-lg:hidden  items-center relative font-Gabarito font-medium text-black dark:text-white">
            <li className='relative flex items-center'>
                <DarkModeToggle/>
            </li>
            <li className='relative'>
              <a href="#" className="opacity-70 dark:opacity-100 bg-transparent before:w-0 hover:before:bottom-0 hover:before:w-full hover:before:bg-black dark:hover:before:bg-white hover:before:absolute hover:before:h-[1px] before:duration-500 before:opacity-70 transition-all ease-in-out">Sign In</a>
            </li>
            <li className='relative'>
                <a href="" className='opacity-70 dark:opacity-100 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black dark:hover:text-opacity-70 transition-colors duration-500 p-[10px] rounded-full'>Get Started</a>
            </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar