import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const List = () => {
  const day = new Date().getDay();
  const axiosPrivate = useAxiosPrivate();
  const [schedule, setSchedule] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axiosPrivate.get(`/schedule/ekskul`);
      setSchedule(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div className="w-full py-[10px] bg-transparent px-[15px] flex justify-center mt-[10px]">
      <div className=" bg-transparent w-full gap-[5px] items-center flex justify-center flex-col">
        <p className="text-blue-500 text-[18px] uppercase font-semibold text-center">
          Jadwal Ekstrakurikuler
        </p>
        <div className="w-full max-w-[150px] h-[2px] bg-yellow-500" />
        <div className="w-full h-full mt-[10px] bg-white flex gap-[10px] ">
          <div className="w-full h-auto bg-transparent p-[10px] flex-col gap-[10px] border border-transparent flex justify-between items-center">
            <div className="grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 grid w-full gap-[5px]">
              <p
                className={`text-center rounded-[5px] py-[10px] ${
                  day === 1 ? "text-white bg-yellow-500" : "text-black"
                }`}
              >
                Sen
              </p>
              <p
                className={`text-center rounded-[5px] py-[10px] ${
                  day === 2 ? "text-white bg-yellow-500" : "text-black"
                }`}
              >
                Sel
              </p>
              <p
                className={`text-center rounded-[5px] py-[10px] ${
                  day === 3 ? "text-white bg-yellow-500" : "text-black"
                }`}
              >
                Rab
              </p>
              <p
                className={`text-center rounded-[5px] py-[10px] ${
                  day === 4 ? "text-white bg-yellow-500" : "text-black"
                }`}
              >
                Kam
              </p>
              <p
                className={`text-center rounded-[5px] py-[10px] ${
                  day === 5 ? "text-white bg-yellow-500" : "text-black"
                }`}
              >
                Jum
              </p>
              <p
                className={`text-center rounded-[5px] py-[10px] ${
                  day === 6 ? "text-white bg-yellow-500" : "text-black"
                }`}
              >
                Sab
              </p>
            </div>
            <div className="grid grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 w-full gap-[5px]">
              <div className="h-auto gap-[5px] bg-transparent flex flex-col">
                {schedule
                  .find((schedule) => schedule.day === "Senin")
                  ?.activities.map((activity, index) => (
                    <div
                      className="h-[150px] rounded-md overflow-hidden bg-blue-300 flex items-end justify-end  flex-col relative"
                      key={index}
                    >
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] left-[5px] w-[25px] flex items-center justify-center  h-[25px]">
                        {activity.grade}
                      </p>
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] right-[5px] w-auto flex items-center justify-center px-[5px] capitalize  h-[25px]">
                        {activity.category}
                      </p>
                      <p className="text-white capitalize text-[18px] font-bold tracking-wide mb-[10px] mr-[10px] text-shadow-md">
                        {activity.ekskul}
                      </p>
                      <div className="bg-blue-500 w-full text-white text-[14px] flex justify-between py-[5px] px-[10px] ">
                        <p className="font-Gabarito">{activity.room}</p>
                        <p className="font-Gabarito">
                          {activity.startTime.substring(0, 5)} -{" "}
                          {activity.endTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="h-auto gap-[5px] bg-transparent flex flex-col">
                {schedule
                  .find((schedule) => schedule.day === "Selasa")
                  ?.activities.map((activity, index) => (
                    <div
                      className="h-[150px] rounded-md overflow-hidden bg-blue-300 flex items-end justify-end  flex-col relative"
                      key={index}
                    >
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] left-[5px] w-[25px] flex items-center justify-center  h-[25px]">
                        {activity.grade}
                      </p>
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] right-[5px] w-auto flex items-center justify-center px-[5px] capitalize  h-[25px]">
                        {activity.category}
                      </p>
                      <p className="text-white capitalize text-[18px] font-bold tracking-wide mb-[10px] mr-[10px] text-shadow-md">
                        {activity.ekskul}
                      </p>
                      <div className="bg-blue-500 w-full text-white text-[14px] flex justify-between py-[5px] px-[10px] ">
                        <p className="font-Gabarito">{activity.room}</p>
                        <p className="font-Gabarito">
                          {activity.startTime.substring(0, 5)} -{" "}
                          {activity.endTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="h-auto gap-[5px] bg-transparent flex flex-col">
                {schedule
                  .find((schedule) => schedule.day === "Rabu")
                  ?.activities.map((activity, index) => (
                    <div
                      className="h-[150px] rounded-md overflow-hidden bg-blue-300 flex items-end justify-end  flex-col relative"
                      key={index}
                    >
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] left-[5px] w-[25px] flex items-center justify-center  h-[25px]">
                        {activity.grade}
                      </p>
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] right-[5px] w-auto flex items-center justify-center px-[5px] capitalize  h-[25px]">
                        {activity.category}
                      </p>
                      <p className="text-white capitalize text-[18px] font-bold tracking-wide mb-[10px] mr-[10px] text-shadow-md">
                        {activity.ekskul}
                      </p>
                      <div className="bg-blue-500 w-full text-white text-[14px] flex justify-between py-[5px] px-[10px] ">
                        <p className="font-Gabarito">{activity.room}</p>
                        <p className="font-Gabarito">
                          {activity.startTime.substring(0, 5)} -{" "}
                          {activity.endTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="h-auto gap-[5px] bg-transparent flex flex-col">
                {schedule
                  .find((schedule) => schedule.day === "Kamis")
                  ?.activities.map((activity, index) => (
                    <div
                      className="h-[150px] rounded-md overflow-hidden bg-blue-300 flex items-end justify-end  flex-col relative"
                      key={index}
                    >
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] left-[5px] w-[25px] flex items-center justify-center  h-[25px]">
                        {activity.grade}
                      </p>
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] right-[5px] w-auto flex items-center justify-center px-[5px] capitalize  h-[25px]">
                        {activity.category}
                      </p>
                      <p className="text-white capitalize text-[18px] font-bold tracking-wide mb-[10px] mr-[10px] text-shadow-md">
                        {activity.ekskul}
                      </p>
                      <div className="bg-blue-500 w-full text-white text-[14px] flex justify-between py-[5px] px-[10px] ">
                        <p className="font-Gabarito">{activity.room}</p>
                        <p className="font-Gabarito">
                          {activity.startTime.substring(0, 5)} -{" "}
                          {activity.endTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="h-auto gap-[5px] bg-transparent flex flex-col">
                {schedule
                  .find((schedule) => schedule.day === "Jumat")
                  ?.activities.map((activity, index) => (
                    <div
                      className="h-[150px] rounded-md overflow-hidden bg-blue-300 flex items-end justify-end  flex-col relative"
                      key={index}
                    >
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] left-[5px] w-[25px] flex items-center justify-center  h-[25px]">
                        {activity.grade}
                      </p>
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] right-[5px] w-auto flex items-center justify-center px-[5px] capitalize  h-[25px]">
                        {activity.category}
                      </p>
                      <p className="text-white capitalize text-[18px] font-bold tracking-wide mb-[10px] mr-[10px] text-shadow-md">
                        {activity.ekskul}
                      </p>
                      <div className="bg-blue-500 w-full text-white text-[14px] flex justify-between py-[5px] px-[10px] ">
                        <p className="font-Gabarito">{activity.room}</p>
                        <p className="font-Gabarito">
                          {activity.startTime.substring(0, 5)} -{" "}
                          {activity.endTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="h-auto gap-[5px] bg-transparent flex flex-col">
                {schedule
                  .find((schedule) => schedule.day === "Sabtu")
                  ?.activities.map((activity, index) => (
                    <div
                      className="h-[150px] rounded-md overflow-hidden bg-blue-300 flex items-end justify-end  flex-col relative"
                      key={index}
                    >
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] left-[5px] w-[25px] flex items-center justify-center  h-[25px]">
                        {activity.grade}
                      </p>
                      <p className="absolute text-[14px] bg-yellow-500 rounded-md text-white top-[5px] right-[5px] w-auto flex items-center justify-center px-[5px] capitalize  h-[25px]">
                        {activity.category}
                      </p>
                      <p className="text-white capitalize text-[18px] font-bold tracking-wide mb-[10px] mr-[10px] text-shadow-md">
                        {activity.ekskul}
                      </p>
                      <div className="bg-blue-500 w-full text-white text-[14px] flex justify-between py-[5px] px-[10px] ">
                        <p className="font-Gabarito">{activity.room}</p>
                        <p className="font-Gabarito">
                          {activity.startTime.substring(0, 5)} -{" "}
                          {activity.endTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
