import Table from './Table'
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Ekstrakulikuler = () => {
  const [isOpen, setOpen] = useState(false);
  
  const toggleExpansion = () => {
    setOpen(!isOpen);
};

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
    <div className="w-full flex flex-col gap-2">
      <div className='flex justify-between'>
      <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">Program</h1>
      <button onClick={toggleExpansion} className='bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500'>Add Data</button>
      </div>
      <div className="w-full bg-white mt-3 mb-5">
        <Table />
      </div>
    </div>
    {isOpen && (
   <div className='bg-transparent flex items-center justify-center w-full absolute top-0 left-0 h-full z-50' style={{ backdropFilter: 'blur(5px)' }}>
   <div className='bg-light w-[600px] h-auto border shadow-md'>
     <div className='flex justify-between p-5 border-b border-gray-300  relative group'>
       <p className='font-semibold opacity-70'>Add Data Program</p>
       <button onClick={toggleExpansion}>
         <AiOutlineClose className='text-2xl'/>
       </button>
     </div>
     <div className='w-full h-full'>
      <form action="" className='flex flex-col p-5 gap-2'>
        <label htmlFor="" className='text-xl'>Aktivitas</label>
        <input type="text" name="" id="" placeholder="Input Your Aktivitas" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Tugas</label>
        <input type="text" name="" id="" placeholder="Input Your Tugas" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Start</label>
        <input type="date" name="" id="" placeholder="Input Your Ekstrakulikuler" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>End</label>
        <input type="date" name="" id="" placeholder="Input Your Ekstrakulikuler" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <button className='bg-blue-500 p-2 mt-4 rounded-md text-white'>Submit</button>
      </form>
     </div>
   </div>
 </div>

    )}
  </div>
  )
}

export default Ekstrakulikuler