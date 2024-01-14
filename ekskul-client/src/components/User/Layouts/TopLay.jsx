import React from 'react'
import { BiHeart, BiLocationPlus, BiLockOpen } from 'react-icons/bi'
import { Bs2CircleFill, BsFillHeartFill } from 'react-icons/bs'
import { FaGraduationCap } from 'react-icons/fa'
import { FaLocationArrow, FaLocationPin } from 'react-icons/fa6'
import { GiLoveLetter } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import { RiCustomerService2Fill } from 'react-icons/ri'

const TopLay = () => {
  return (
    <div className='bg-transparent w-full  h-auto grid grid-cols-1 '>
      <div className='bg-[#3F85EC] w-full py-[10px] px-[15px] flex justify-center '>
        <div className='max-w-[1000px] bg-transparent w-full flex justify-between'>
          <div className='flex items-center gap-[15px] text-white text-[15px]'>
            <div className='flex items-center gap-[5px]'>
              <FaLocationArrow/>
             <p className='capitalize'>cikaret, gg kasadaran</p>
            </div>
            <div className='flex items-center gap-[5px]'>
              <MdEmail/> 
            <p>babakan176@gmail.com</p>
            </div>
          </div>
          <div className='flex gap-[5px] text-white items-center text-[15px]'>
            <BiLockOpen/>
            <p className='capitalize'>login</p>
          </div>
        </div>
      </div>
      <div className='w-full py-[10px] border-b border-black border-opacity-20 bg-white px-[15px] flex justify-center'>
      <div className='max-w-[1000px] bg-transparent w-full flex justify-between'>
        <div className='flex items-center gap-[5px]'>
          <FaGraduationCap className='text-blue-500 text-[25px]'/>
          <p className='text-[22px] uppercase font-semibold'>eskul</p>
        </div>
        <div className='flex gap-[30px] items-center'>
          <div className='flex items-center gap-[10px]'>
            <RiCustomerService2Fill className='text-[18px]'/>
            <div>
              <p className='text-[14px] font-light capitalize'>need any help?</p>
              <p className='text-[14px] font-semibold'>+62 8560743 6610</p>
            </div>
          </div>
            <button className='p-[5px] capitalize text-[12px] rounded-sm text-white bg-blue-500'>email now</button>
        </div>
        </div>
      </div>
      <div className='w-full py-[10px] bg-white px-[15px] flex justify-center'>
      <div className='max-w-[1000px] bg-transparent w-full flex justify-between'>
        <ul className='flex gap-[10px] uppercase text-[14px] font-semibold'>
          <li>
            <a href="#home">home</a>
          </li>
          <li>
            <a href="">jadwal</a>
          </li>
          <li>
            <a href="">gallery</a>
          </li>
          <li>
            <a href="">contact us</a>
          </li>
        </ul>
        <ul className='flex items-center gap-[10px] '>
          <li>
            <a href="">
              <BsFillHeartFill className='text-[16px]'/>
            </a>
          </li>
          <li>
            <a href="">
              <Bs2CircleFill className='text-[16px]'/>
            </a>
          </li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default TopLay