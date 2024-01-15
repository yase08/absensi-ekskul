

import { TbDeviceImacBolt } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const Info = () => {
  const day = new Date().getDay();

  return (
    <div className='w-full py-[10px] image-cerita px-[15px] flex justify-center mt-[10px]'>
      <div className='bg-transparent w-full gap-[5px] items-center flex justify-center flex-col'>
        <p className='text-yellow-500 text-[18px] uppercase font-semibold text-center'>top category</p>
        <div className='w-full max-w-[150px] h-[2px] bg-yellow-500' />
        <p className='text-[40px] font-bold uppercase text-white'>kelas category</p>
        <div className='w-full h-full mt-[10px] bg-transparent flex gap-[10px] '>
          <div className='grid grid-cols-2 w-full h-full max-h-[500px] overflow-hidden '>
            <div className='w-full h-full text-white bg-transparent border-r border-[#85888E] flex flex-col gap-[30px] '>
              <Swiper
                spaceBetween={0}
                slidesPerView={2}
                direction="vertical"
                className='w-full max-h-[300px]'
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto scroll every 3 seconds
              >
                <SwiperSlide>
                  {/* Slide content for the first item */}
                  <div className='w-full h-[150px] bg-red-500 hover:bg-[#040717] p-[20px] rounded-lg  bg-transparent flex-row-reverse flex items-center justify-start gap-[20px] '>
                        <span className='text-white bg-red-500 p-[10px] rounded-md'>
                        <TbDeviceImacBolt className='text-[30px]'/>
                        </span>
                        <div className='w-full h-auto items-end flex-col bg-transparent text-white gap-[5px] justify-center flex'>
                            <h1 className='uppercase text-[16px] font-bold'>present jan 2006 - feb 2007</h1>
                            <div className='w-full h-auto text-end text-gray-400'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sequi, impedit tenetur omnis ducimus aperiam?</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* Slide content for the second item */}
                  <div className='w-full h-[150px] bg-red-500 hover:bg-[#040717] p-[20px] rounded-lg  bg-transparent flex-row-reverse flex items-center justify-start gap-[20px] '>
                        <span className='text-white bg-red-500 p-[10px] rounded-md'>
                        <TbDeviceImacBolt className='text-[30px]'/>
                        </span>
                        <div className='w-full h-auto items-end flex-col bg-transparent text-white gap-[5px] justify-center flex'>
                            <h1 className='uppercase text-[16px] font-bold'>present jan 2006 - feb 2007</h1>
                            <div className='w-full h-auto text-end text-gray-400'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sequi, impedit tenetur omnis ducimus aperiam?</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* Slide content for the third item */}
                  <div className='w-full h-[150px] bg-red-500 hover:bg-[#040717] p-[20px] rounded-lg  bg-transparent flex-row-reverse flex items-center justify-start gap-[20px] '>
                        <span className='text-white bg-red-500 p-[10px] rounded-md'>
                        <TbDeviceImacBolt className='text-[30px]'/>
                        </span>
                        <div className='w-full h-auto items-end flex-col bg-transparent text-white gap-[5px] justify-center flex'>
                            <h1 className='uppercase text-[16px] font-bold'>present jan 2006 - feb 2007</h1>
                            <div className='w-full h-auto text-end text-gray-400'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sequi, impedit tenetur omnis ducimus aperiam?</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* Slide content for the fourth item */}
                  <div className='w-full h-[150px] bg-red-500 hover:bg-[#040717] p-[20px] rounded-lg  bg-transparent flex-row-reverse flex items-center justify-start gap-[20px] '>
                        <span className='text-white bg-red-500 p-[10px] rounded-md'>
                        <TbDeviceImacBolt className='text-[30px]'/>
                        </span>
                        <div className='w-full h-auto items-end flex-col bg-transparent text-white gap-[5px] justify-center flex'>
                            <h1 className='uppercase text-[16px] font-bold'>present jan 2006 - feb 2007</h1>
                            <div className='w-full h-auto text-end text-gray-400'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sequi, impedit tenetur omnis ducimus aperiam?</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className='w-full h-full text-white bg-transparent border-r border-[#85888E] flex flex-col gap-[30px]'>
              <Swiper
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                spaceBetween={10}
                slidesPerView={3}
                direction="vertical"
                className='w-full h-full'
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto scroll every 3 seconds
              >
                <SwiperSlide>
                  {/* Slide content for the fifth item */}
                  <div className='w-full h-[150px] bg-red-500 hover:bg-[#040717] p-[20px] rounded-lg  bg-transparent flex-row-reverse flex items-center justify-start gap-[20px] '>
                        <span className='text-white bg-red-500 p-[10px] rounded-md'>
                        <TbDeviceImacBolt className='text-[30px]'/>
                        </span>
                        <div className='w-full h-auto items-end flex-col bg-transparent text-white gap-[5px] justify-center flex'>
                            <h1 className='uppercase text-[16px] font-bold'>present jan 2006 - feb 2007</h1>
                            <div className='w-full h-auto text-end text-gray-400'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sequi, impedit tenetur omnis ducimus aperiam?</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Add more SwiperSlides as needed */}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
