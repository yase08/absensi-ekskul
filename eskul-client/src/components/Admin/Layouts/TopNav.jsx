import {GiHamburgerMenu} from 'react-icons/gi'
import {BiCodeAlt} from 'react-icons/bi'
import {BsKeyboard} from 'react-icons/bs'
import {MdKeyboardDoubleArrowRight, MdColorLens} from 'react-icons/md'
import {FiSettings, FiActivity} from 'react-icons/fi'
import {CgProfile, CgLogOut} from 'react-icons/cg'
import {AiOutlineMail, AiOutlineBell, AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import { useEffect } from 'react'
// import AdminPicture from './AdminPicture';
// import axios from 'axios';



// eslint-disable-next-line react/prop-types
const TopNav = ({toggleExpansion, toggleOpenProfile, expanded, toggleChangeNavbar, toggleOpenChangeBg}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [isOpenMassage, setIsOpenMassage] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isButtonVisible1, setIsButtonVisible1] = useState(false);
    const [isButtonVisible2, setIsButtonVisible2] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('bg-primary');


    useEffect(() => {
      const savedColor = localStorage.getItem('backgroundColor');
      if (savedColor) {
        setBackgroundColor(savedColor);
      }
    }, []);

  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setIsOpenNotification(false); 
      setIsOpenMassage(false); 
    };
  
    const toggleDropdownNotification = () => {
      setIsOpenNotification(!isOpenNotification);
      setIsOpen(false); 
      setIsOpenMassage(false); 
    };

    const toggleDropdownMassage = () => {
      setIsOpenNotification(false);
      setIsOpen(false); 
      setIsOpenMassage(!isOpenMassage); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        window.location.href = '/';
    };

    const truncateName = (name, maxLength = 10) => {
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength) + '...';
        }
    }

    const handleOpenForm = (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === '>') {
          setIsButtonVisible(true);
        }
    
        if (event.ctrlKey && event.shiftKey && event.key === '<') {
          setIsButtonVisible(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('keydown', handleOpenForm);
    
        return () => {
          document.removeEventListener('keydown', handleOpenForm);
        };
      }, []);

      const handleSecretKeywordInputChange = (event) => {
        const inputKeyword = event.target.value.toLowerCase();
        if (inputKeyword === 'perpindahan') {
          setIsButtonVisible1(true);
          setIsButtonVisible(false)
        } if (inputKeyword === 'hapus perpindahan'){
            setIsButtonVisible1(false)
            setIsButtonVisible(false)
        } if (inputKeyword === 'ganti bg') {
            setIsButtonVisible2(true)
            setIsButtonVisible(false)
        } if (inputKeyword === 'hapus bg') {
            setIsButtonVisible2(false)
            setIsButtonVisible(false)
        } if (inputKeyword === 'hapus semua') {
            setIsButtonVisible1(false)
            setIsButtonVisible2(false)
            setIsButtonVisible(false)
        }
      };
    
    return (
        <div className='w-full'>
            <nav className={`h-[115px] px-[29px] pt-[29px] flex justify-between items-start z-40`} style={{ backgroundColor: backgroundColor }}>
                <div>
                    <button onClick={toggleExpansion} className={`${expanded ? 'max-lg:hidden':''}`}>
                        <GiHamburgerMenu className='text-white text-xl'/>
                    </button>
                </div>
                <div className='flex gap-[15px] items-center'>
                {isButtonVisible && (
                    <div>
                        {/* Form untuk memasukkan kata kunci */}
                        <input
                        type="text"
                        placeholder="Masukkan kata kunci"
                        onChange={handleSecretKeywordInputChange}
                        className='outline-none rounded-md px-2'

                        />
                    </div>
                    )}
                {isButtonVisible1 && (
                    <button onClick={toggleChangeNavbar}>
                    <BsKeyboard className='text-white text-xl font-bold' />
                    </button>
                 )}
                {isButtonVisible2 && (
                    <button onClick={toggleOpenChangeBg}>
                    <MdColorLens className='text-white text-xl font-bold' />
                    </button>
                 )}
                    <button onClick={toggleDropdownMassage}>
                        <AiOutlineMail className='text-white text-xl font-bold'/>
                    </button>
                    <button onClick={toggleDropdownNotification}>
                        <AiOutlineBell className='text-white text-xl font-bold'/>
                    </button>
                    <div className="relative inline-block text-left">
                    <div>
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex gap-3 items-center text-white text-sm focus:outline-none"
                    >
                        <div className='w-[30px] h-[30px]'>
                            {/* <AdminPicture/> */}
                        </div>
                        <p className="text-white text-sm capitalize">
                            {truncateName("Hi, VeryLongUsername")}
                        </p>
                    </button>
                </div>

                    {isOpen && (
                        <div className="z-50 origin-top-right absolute right-0 px-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                            className="py-1 flex flex-col gap-y-4"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <p className='font-bold font-poppins opacity-70 text-sm tracking-widest text-center mt-3'>LOGGED IN 5 MIN AGO</p>
                            <button onClick={toggleOpenProfile} className='flex items-center gap-2 hover:text-blue-500'>
                                <CgProfile/>
                                <p>Profile</p>
                            </button>
                            <a href="#" className='flex items-center gap-2 hover:text-blue-500'>
                                <FiActivity/>
                                <p>Activity</p>
                            </a>
                            <a href="#" className='flex items-center gap-2 hover:text-blue-500'>
                                <FiSettings/>
                                <p>Settings</p>
                            </a>
                            {/* Logout */}
                            <button onClick={handleLogout} className='flex items-center gap-2 text-red-500 my-5 hover:text-blue-500 before:w-full before:h-[0.08px] before:opacity-20 before:bg-black before:absolute before:bottom-[65px] before:right-0'>
                                <CgLogOut/>
                                <p>Logout</p>
                            </button>
                        </div>
                        </div>
                    )}

   

                    </div>
                </div>
                    {isOpenMassage && (
                        <div className="z-50 md:origin-top-right max-md:fixed md:absolute max-md:right-0  md:right-[30px] max-md:top-0 md:top-[60px] md:mt-2 md:w-[350px] max-md:w-full  md:rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                            className=" flex flex-col"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <div className='w-full h-[58px] flex justify-between p-[15px] bg-transparent '>
                                <p className='text-sm opacity-70'>Massage</p>
                                <div className='flex items-center'>
                                <a href='#' className='text-sm text-blue-500 max-md:hidden'>Mark All As Read</a>
                                <button onClick={toggleDropdownMassage} className='md:hidden'><AiOutlineClose className='text-xl'/></button>
                                </div>
                            </div>
                            <div className='px-[15px] h-[320px] overflow-y-scroll hidden-scroll'>
                                <div className=' bg-transparent border-b flex justify-between items-center'>
                                    <div className='flex gap-[15px] h-[76px] items-center'>
                                    <ul className='bg-blue-500 w-[40px] h-[40px] rounded-full flex overflow-hidden justify-center items-center'>
                                        <img src='https://demo.getstisla.com/assets/img/avatar/avatar-1.png' className='text-xl text-white '/>
                                    </ul>
                                    <ul className='flex flex-col gap-1 my-5'>
                                        <li><p className='capitalize text-sm font-poppins opacity-70 font-semibold'>Fadhli</p></li>
                                        <li><p className=' text-xs opacity-70'>Hello Bro</p></li>
                                    </ul>
                                    </div>
                                    <div>
                                        <p className='text-xs font-medium uppercase'>10 minute</p>
                                    </div>
                                </div>
                                <div className=' bg-transparent border-b flex justify-between items-center'>
                                    <div className='flex gap-[15px] h-[76px] items-center'>
                                    <ul className='bg-blue-500 w-[40px] h-[40px] rounded-full flex overflow-hidden justify-center items-center'>
                                        <img src='https://demo.getstisla.com/assets/img/avatar/avatar-1.png' className='text-xl text-white '/>
                                    </ul>
                                    <ul className='flex flex-col gap-1 my-5'>
                                        <li><p className='capitalize text-sm font-poppins opacity-70 font-semibold'>Fadhli</p></li>
                                        <li><p className=' text-xs opacity-70'>Hello Bro</p></li>
                                    </ul>
                                    </div>
                                    <div>
                                        <p className='text-xs font-medium uppercase'>10 minute</p>
                                    </div>
                                </div>
                                <div className=' bg-transparent border-b flex justify-between items-center'>
                                    <div className='flex gap-[15px] h-[76px] items-center'>
                                    <ul className='bg-blue-500 w-[40px] h-[40px] rounded-full flex overflow-hidden justify-center items-center'>
                                        <img src='https://demo.getstisla.com/assets/img/avatar/avatar-1.png' className='text-xl text-white '/>
                                    </ul>
                                    <ul className='flex flex-col gap-1 my-5'>
                                        <li><p className='capitalize text-sm font-poppins opacity-70 font-semibold'>Fadhli</p></li>
                                        <li><p className=' text-xs opacity-70'>Hello Bro</p></li>
                                    </ul>
                                    </div>
                                    <div>
                                        <p className='text-xs font-medium uppercase'>10 minute</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-[59px] flex justify-center items-center'>
                                <a href="#" className='text-blue-500 text-sm font-poppins flex items-center gap-1'>View All <span><MdKeyboardDoubleArrowRight className='text-lg'/></span></a>
                            </div>
                        </div>
                        </div>
                    )}
                    {isOpenNotification && (
                        <div className="z-50 md:origin-top-right max-md:fixed md:absolute max-md:right-0  md:right-[30px] max-md:top-0 md:top-[60px] md:mt-2 md:w-[350px] max-md:w-full  md:rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                            className=" flex flex-col"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <div className='w-full h-[58px] flex justify-between p-[15px] bg-transparent '>
                                <p className='text-sm opacity-70'>Notifications</p>
                                <div className='flex items-center'>
                                <a href='#' className='text-sm text-blue-500 max-md:hidden'>Mark All As Read</a>
                                <button onClick={toggleDropdownNotification} className='md:hidden'><AiOutlineClose className='text-xl'/></button>
                                </div>
                            </div>
                            <div className='px-[15px] h-[320px] overflow-y-scroll hidden-scroll'>
                                <div className='flex gap-[15px] w-full h-[76px] bg-transparent items-center'>
                                    <ul className='bg-blue-500 w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                        <BiCodeAlt className='text-xl text-white'/>
                                    </ul>
                                    <ul className='flex flex-col gap-1'>
                                        <li><p className='capitalize text-sm font-poppins opacity-70'>New Update Has Been Added</p></li>
                                        <li><p className='uppercase text-xs opacity-70'>2 min ago</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='w-full h-[59px] flex justify-center items-center'>
                                <a href="#" className='text-blue-500 text-sm font-poppins flex items-center gap-1'>View All <span><MdKeyboardDoubleArrowRight className='text-lg'/></span></a>
                            </div>
                        </div>
                        </div>
                    )}
            </nav>
        </div>
    )
}

export default TopNav