import { useState } from 'react'
import LogoBlack from '../../../assets/Logo-black.png'
import LogoWhite from '../../../assets/Logo-white.png'
import DarkModeToggle from './DarkModeToggle'
import {RxHamburgerMenu} from 'react-icons/rx'

const TopNavbar = () => {
    const [isOpen, setOpen] = useState(false);


    const toggleOpen = () => {
        setOpen(!isOpen);
    };
  return (
    <div>
        <nav className="backdrop-blur-md lg:hidden w-full text-black flex justify-between items-center h-[100px] px-6 transition-all shadow-lg dark:shadow-slate-600">
        <ul className="flex gap-x-5 max-lg:gap-x-10 items-center relative font-Gabarito font-medium text-black dark:text-white">
            <li>
                <a href="#" >
                    <img src={LogoBlack} alt="" className='w-[100px] dark:hidden' />
                    <img src={LogoWhite} alt="" className='w-[100px] hidden dark:block' />
                    </a>
                </li>
            </ul>
            <ul className='md:hidden'>
                <li>
                    <button onClick={toggleOpen}>
                        <RxHamburgerMenu className='text-3xl'/>
                    </button>
                </li>
            </ul>
            <ul className={` gap-x-5 lg:hidden   items-center relative font-Gabarito font-medium text-black dark:text-white ${isOpen ? 'max-md:absolute max-md:right-[10px] max-md:after:w-5 max-md:after:absolute max-md:after:right-[20px] max-md:after:rotate-[45deg] max-md:after:-top-[10px] max-md:after:h-5 max-md:after:bg-good max-md:top-[80px] bg-good  ':'max-md:hidden flex'}`}>
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
    </div>
  )
}

export default TopNavbar
