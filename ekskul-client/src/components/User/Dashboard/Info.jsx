import React from 'react'
import foto from "../../../assets/wk2.jpeg"

const Info = () => {
  const day = new Date().getDay();
  console.log(day)
  return (
    <div className='w-full py-[10px] bg-transparent px-[15px] flex justify-center mt-[10px]'>
    <div className=' bg-transparent w-full gap-[5px] items-center flex justify-center flex-col'>
      <p className='text-blue-500 text-[18px] uppercase font-semibold text-center'>top category</p>
      <div className='w-full max-w-[150px] h-[2px] bg-yellow-500'/>
      <p className='text-[40px] font-bold uppercase'>kelas category</p>
      <div className='w-full h-full mt-[10px] bg-white flex gap-[10px] '>
        <div className='w-full h-auto bg-transparent p-[10px] flex-col gap-[10px] border border-transparent flex justify-between items-center'>
          <div className='grid grid-cols-7 w-full gap-[5px]'>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 1 ? 'text-white bg-yellow-500':'text-black'}`}>Sen</p>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 2 ? 'text-white bg-yellow-500':'text-black'}`}>Sel</p>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 3 ? 'text-white bg-yellow-500':'text-black'}`}>Rab</p>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 4 ? 'text-white bg-yellow-500':'text-black'}`}>Kam</p>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 5 ? 'text-white bg-yellow-500':'text-black'}`}>Jum</p>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 6 ? 'text-white bg-yellow-500':'text-black'}`}>Sab</p>
          <p className={`text-center rounded-[5px] py-[10px] ${day === 0 ? 'text-white bg-yellow-500':'text-black'}`}>Min</p>
          </div>
          <div className='grid grid-cols-7 w-full gap-[5px]'>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
            <div className='h-auto gap-[5px] bg-transparent grid grid-cols-1'>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
              <div className='h-[210px] bg-black flex items-end justify-end p-[15px] '>
                <p className='text-white'>basket</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  )
}

export default Info