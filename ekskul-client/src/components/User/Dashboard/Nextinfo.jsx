import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsClockHistory } from 'react-icons/bs'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { SiPhpmyadmin } from 'react-icons/si'

const Nextinfo = () => {
  return (
    <div className='w-full py-[20px] bg-[#3E85ED] text-white px-[15px] flex justify-center '>
    <div className='max-w-[1000px]  w-full items-center flex justify-center py-[15px] flex-col'>
        <h1 className='text-[25px] font-bold'>Our Esktrakulikuler</h1>
        <div className="rounded-lg overflow-hidden w-full h-full text-black max-md:py-5 bg-white flex justify-between items-center gap-2 max-md:flex-col">
            <div className="w-full flex justify-between items-center ">
              <div className="ml-5">
                <p className="font-poppins text-lg font-bold opacity-80 max-2xl:text-sm">
                  Admin
                </p>
                <p className="font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl ">
                  212
                </p>
                <p className="font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs">
                  Increased By 90%
                </p>
              </div>
              <span className="mr-10">
                <SiPhpmyadmin className="text-5xl font-bold opacity-80 max-2xl:text-4xl" />
              </span>
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="ml-5">
                <p className="font-poppins text-lg font-bold opacity-80 max-2xl:text-sm">
                  Instruktur
                </p>
                <p className="font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl">
                  212
                </p>
                <p className="font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs">
                  Increased By 90%
                </p>
              </div>
              <span className="mr-10">
                <AiOutlineUser className="text-[46px] font-bold opacity-80 max-2xl:text-4xl" />
              </span>
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="ml-5">
                <p className="font-poppins text-lg font-bold opacity-80 max-2xl:text-sm">
                  Siswa
                </p>
                <p className="font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl">
                  21
                </p>
                <p className="font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs">
                  Increased By 90%
                </p>
              </div>
              <span className="mr-10">
                <BsClockHistory className="text-[43px] font-bold opacity-80 max-2xl:text-4xl" />
              </span>
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="ml-5">
                <p className="font-poppins text-lg font-bold opacity-80 max-2xl:text-sm">
                  Online
                </p>
                <p className="font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl">
                121
                </p>
                <p className="font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs">
                  Increased By 90%
                </p>
              </div>
              <span className="mr-10">
                <HiOutlineStatusOnline className="text-5xl font-bold opacity-80 max-2xl:text-4xl" />
              </span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Nextinfo