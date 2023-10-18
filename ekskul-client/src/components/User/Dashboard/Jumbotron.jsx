import React from 'react'
import wk2 from '../../../assets/Rectangle 39.png'

const Jumbotron = () => {
  return (
    <div className='bg-transparent w-full h-auto px-[165px] py-[165px] font-Nunito relative'>
      <div className='bg-transparent w-full '>
        <h1 className='text-[#004aad] text-[45px] leading-[normal] capitalize'>selamat datang di website</h1>
        <p className="font-bold text-transparent text-[48px] leading-[normal]">
           <span className="text-[#ffde59]">Eks</span>
           <span className="text-[#ffbd59]">trakuri</span>
           <span className="text-[#ff914d]">kuler</span>
        </p>
        <h1 className="font-bold text-[48px] leading-[normal] text-[#004aad]">WIKRAMA</h1>
        <p className='capitalize my-2'>segala informasi tentang ekstrakulikuler di <span className='uppercase'>smk wikrama bogor</span> ada di sini</p>
        <button className='bg-[#004AAD] p-[22px] text-white rounded-xl capitalize mt-5 text-[20px] font-bold'>get ekstrakurikuler</button>
      </div>
      <div className='w-[38%] absolute top-0 right-0'>
        <img src={wk2}/>
      </div>
    </div>
  )
}

export default Jumbotron