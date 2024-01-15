


import React from 'react';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import  { Swiper, SwiperSlide } from 'swiper/react';


const Teacher = () => {
  return (
    <div className="p-[40px] image-cerita ">   
       <p className='text-blue-500 text-[18px] uppercase font-semibold text-center'>top category</p>
    <p className='text-[40px] font-bold uppercase text-center text-white'> kelas category</p>
      <Swiper
               spaceBetween={30}
               slidesPerView={3}
               centeredSlides={false}
               navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
               loop={true}
               effect="scale"
               autoplay={{ delay: 3000, disableOnInteraction: false }}
               breakpoints={{
                 1024: {
                   slidesPerView: 3,
                 },
                 900: {
                   slidesPerView: 2,
                 },
                 640: {
                   slidesPerView: 1,
                 },
                 0: {
                   slidesPerView: 1,
                 }
               }}
      >
        <SwiperSlide>
      {/* <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img className="w-full h-56 object-cover object-center" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>
      
        <div className="py-4 px-6">
            <h1 className="text-[18px] font-semibold text-gray-800">Patterson johnson</h1>
            <p className="py-2 text-[14px] text-gray-700">Full Stack maker & UI / UX Designer , love hip hop music Author of Building UI.</p>
          
            <div className="flex items-center mt-4 text-gray-700">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                </svg>
                <h1 className="px-2 text-sm">California</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                </svg>
                <h1 className="px-2 text-sm">patterson@example.com</h1>
            </div>
        </div>
    </div> */}


        <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center">
                        <div className="">
                            <img
                            className="h-[83px] w-[83px] rounded-lg"
                            src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image2.png?raw=true"
                            alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-base font-medium text-navy-700 dark:text-white">
                           Kak David
                            </p>
                            <p className=" text-sm text-gray-600">
                            Ndak Tau 
                            </p>
                            <div className='flex gap-[10px] mt-[5px] text-[14px]'>
                                <a href="">
                                    <BsInstagram/>
                                </a>
                                <a href="">
                                    <FaFacebook/>
                                </a>
                                <a href="">
                                    <BsTwitterX/>
                                </a>
                            </div>
                        </div>
                        </div>
                        
                    </div>
        </SwiperSlide>
        <SwiperSlide>
      {/* <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img className="w-full h-56 object-cover object-center" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>
      
        <div className="py-4 px-6">
            <h1 className="text-[18px] font-semibold text-gray-800">Patterson johnson</h1>
            <p className="py-2 text-[14px] text-gray-700">Full Stack maker & UI / UX Designer , love hip hop music Author of Building UI.</p>
          
            <div className="flex items-center mt-4 text-gray-700">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                </svg>
                <h1 className="px-2 text-sm">California</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                </svg>
                <h1 className="px-2 text-sm">patterson@example.com</h1>
            </div>
        </div>
    </div> */}


        <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center">
                        <div className="">
                            <img
                            className="h-[83px] w-[83px] rounded-lg"
                            src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image2.png?raw=true"
                            alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-base font-medium text-navy-700 dark:text-white">
                            Kak Rio
                            </p>
                            <p className=" text-sm text-gray-600">
                            Unity Teacher 
                            </p>
                            <div className='flex gap-[10px] mt-[5px] text-[14px]'>
                                <a href="">
                                    <BsInstagram/>
                                </a>
                                <a href="">
                                    <FaFacebook/>
                                </a>
                                <a href="">
                                    <BsTwitterX/>
                                </a>
                            </div>
                        </div>
                        </div>
                        
                    </div>
        </SwiperSlide>
        <SwiperSlide>
      {/* <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img className="w-full h-56 object-cover object-center" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>
      
        <div className="py-4 px-6">
            <h1 className="text-[18px] font-semibold text-gray-800">Patterson johnson</h1>
            <p className="py-2 text-[14px] text-gray-700">Full Stack maker & UI / UX Designer , love hip hop music Author of Building UI.</p>
          
            <div className="flex items-center mt-4 text-gray-700">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                </svg>
                <h1 className="px-2 text-sm">California</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                </svg>
                <h1 className="px-2 text-sm">patterson@example.com</h1>
            </div>
        </div>
    </div> */}


        <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center">
                        <div className="">
                            <img
                            className="h-[83px] w-[83px] rounded-lg"
                            src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image2.png?raw=true"
                            alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-base font-medium text-navy-700 dark:text-white">
                            Akmalmaulana Basri
                            </p>
                            <p className=" text-sm text-gray-600">
                            Java Teacher 
                            </p>
                            <div className='flex gap-[10px] mt-[5px] text-[14px]'>
                                <a href="">
                                    <BsInstagram/>
                                </a>
                                <a href="">
                                    <FaFacebook/>
                                </a>
                                <a href="">
                                    <BsTwitterX/>
                                </a>
                            </div>
                        </div>
                        </div>
                        
                    </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Teacher;
