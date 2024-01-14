import React from 'react'
import foto from "../../../assets/wk2.jpeg"

const Info = () => {
  const day = new Date().getDay();
  console.log(day)
  return (
    <div className='w-full py-[10px] bg-transparent image-cerita px-[15px] flex justify-center mt-[10px]'>
    <div className=' bg-transparent w-full gap-[5px] items-center flex justify-center flex-col'>
      <p className='text-blue-500 text-[18px] uppercase font-semibold text-center'>top category</p>
      <div className='w-full max-w-[150px] h-[2px] bg-yellow-500'/>
      <p className='text-[40px] font-bold uppercase text-white'>kelas category</p>
      <div className='w-full h-full mt-[10px] bg-transparent flex gap-[10px] '>
        <div className='w-full grid grid-cols-2 h-auto bg-transparent p-[10px] flex-col gap-[10px] border border-transparent justify-start items-start'>
          <div  className='w-full h-full bg-white'>
            <div>
              <p>m nazxc n,</p>
            </div>
          </div>
          <div  className='w-full h-full bg-white'>
            <div>
              <p>m nazxc n,</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  )
}

export default Info