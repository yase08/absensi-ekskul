import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const scheduleData = {
    Senin: [
      { time: '08:00 AM', event: 'Meeting' },
      { time: '10:00 AM', event: 'Development' },
      // Add more schedule items for Senin
    ],
    Selasa: [
      { time: '09:00 AM', event: 'Planning' },
      { time: '11:00 AM', event: 'Testing' },
      // Add more schedule items for Selasa
    ],
    Rabu: [
      // Add schedule items for Rabu
      { time: '09:00 AM', event: 'idk' },
      { time: '11:00 AM', event: 'males' },
    ],
    Kamis: [
      // Add schedule items for Kamis
      { time: '09:00 AM', event: 'Planning' },
      { time: '11:00 AM', event: 'Testing' },
    ],
    Jumat: [
      // Add schedule items for Jumat
      { time: '09:00 AM', event: 'Planning' },
      { time: '11:00 AM', event: 'Testing' },
    ],
    Sabtu: [
      // Add schedule items for Sabtu
      { time: '09:00 AM', event: 'Planning' },
      { time: '11:00 AM', event: 'Testing' },
    ],
  };
  
  const DaySchedule = ({ day }) => (
<>
  <div className="w-full flex justify-center items-center">
    <div className="ml-5">
      <p className="font-poppins text-lg font-bold opacity-80 max-2xl:text-sm">
        Jadwal {day}
      </p>
    </div>
  </div>
  {scheduleData[day]?.map((item, index) => (
    <div className="w-full flex justify-center items-center" key={index}>
      <div className="ml-5">
        <p className="font-poppins text-lg font-bold opacity-80 max-2xl:text-sm">
          {item.time} - {item.event}
        </p>
      </div>
    </div>
  ))}
</>

  );
  
  // eslint-disable-next-line react/prop-types
  const Jumbotron = ({ expanded }) => {
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
  
    const handleDayChange = (event) => {
      const selectedDay = event.target.value;
      if (!selectedDays.includes(selectedDay)) {
        setSelectedDays([...selectedDays, selectedDay]);
      }
      setSelectedDay(selectedDay);
    };
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
      <div className="w-full">
        <select name="" className='w-full' id="" value={selectedDay} onChange={handleDayChange}>
          <option value="" disabled>
            Select a day
          </option>
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
          <option value="Sabtu">Sabtu</option>
        </select>
        <div
          className={`bg-white shadow-top transition-all bg-transition duration-[700ms] relative text-white max-lg:h-[140px] lg:h-[150px] 2xl:h-[190px] max-md:h-[450px] flex justify-between items-start ${
            expanded ? 'w-[100%]' : 'w-[100%]'
          } `}
        >
          <div className="w-full h-full absolute ">
            <div className="rounded-lg overflow-hidden w-full h-full text-black max-md:py-5 bg-transparent flex justify-between items-center gap-2 max-md:flex-col">
              {selectedDays.length >= 5 ? (
                <Slider {...settings}>
                  {selectedDays.map((day, index) => (
                    <DaySchedule key={index} day={day} />
                  ))}
                </Slider>
              ) : (
                <DaySchedule day={selectedDay} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Jumbotron;
  