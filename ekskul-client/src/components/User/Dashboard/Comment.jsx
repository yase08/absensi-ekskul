import React from 'react'

const comment = () => {
  return (
    <div className='w-full bg-black image-cerita flex text-white items-center justify-center gap-[20px] p-[40px] flex-col'>
        <img src="https://img.antaranews.com/cache/730x487/2018/11/Kepsek-SMK-Wikrama-Iin-Mulyani1.jpeg" alt="" className='w-[120px] h-[120px] shadow-lg shadow-white rounded-full' />
        <div className='bg-white text-black max-w-[500px] flex flex-col gap-[10px] w-full p-[20px] rounded-md'>
            <p>
        “Kami menekankan kembali bahwa di Wikrama, soft skill adalah hal yang utama, kegiatan ekstrakurikuler Wikrama adalah salah satu tools pembentukan soft skill. Kerja keras, gigih, mandiri, komitmen, mampu bekerjasama, percaya diri adalah hal yang ingin kami tanamkan. Tentunya terintregrasi dengan program yang lain”
            </p>
            <p className='text-center capitalize font-bold'>-- iin mulyani --</p>
        </div>
    </div>
  )
}

export default comment