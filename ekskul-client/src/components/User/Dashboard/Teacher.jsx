import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import profile from "../../../assets/profile.png";

const Teacher = () => {
  const axiosPrivate = useAxiosPrivate();
  const [instructor, setInstructor] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axiosPrivate.get(`/user/instructor`);
      setInstructor(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div className="p-[40px]">
      <p className="text-blue-500 text-[18px] uppercase font-semibold text-center">
        Ekstrakurikuler
      </p>
      <p className="text-[40px] font-bold uppercase text-center text-white text-shadow-md">
        Penanggung Jawab
      </p>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={false}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
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
          },
        }}
      >
        {instructor.map((instructor) => (
          <SwiperSlide>
            <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500">
              <div className="flex items-center">
                <div className="">
                  <img
                    className="h-[83px] w-[83px] rounded-lg"
                    src={
                      instructor.image !== null || ""
                        ? instructor.image
                        : profile
                    }
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {instructor.name}
                  </p>
                  <p className=" text-sm text-gray-600">{instructor.email}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Teacher;
