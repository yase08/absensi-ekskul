import React from 'react'
import wk2 from '../../../assets/Rectangle 39.png'

const Jumbotron = () => {
  return (
    <div id='home' className='w-full image-cerita relative flex flex-col bg-black justify-center gap-[5px] items-center h-[60dvh]'>
      <h1 className="text-5xl font-bold text-white uppercase text-shadow-md">Absensi Ekstrakurikuler</h1>
      <p className='max-w-[700px] text-center text-white'>
      Selamat datang di era pendidikan yang penuh inovasi dan dinamika, di mana setiap siswa di SMK Wikrama Bogor memiliki kesempatan untuk tumbuh dan berkembang melalui berbagai kegiatan ekstrakurikuler yang membentuk karakter dan kompetensi mereka.         </p>
      {/* <div className='w-full h-auto p-[20px] bg-transparent flex items-center justify-center top-[350px] absolute'>
        <div className='max-w-[500px] w-full h-full bg-white p-[10px] flex flex-col'>
          <h1 className='capitalize font-bold '>see gallery</h1>
          <div className='flex justify-between w-full'>
            <div className='w-full'>
              <p>title</p>
              <input type="text" className='border border-blue-500 w-full' />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Jumbotron