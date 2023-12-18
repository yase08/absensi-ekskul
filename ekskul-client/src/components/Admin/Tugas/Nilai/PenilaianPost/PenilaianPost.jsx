import { DatePicker } from "antd/lib";
import Table from "./Table";
import { useState } from "react";
// import { createAttendance } from "../../../../services/attendance.service";

const PenilaianPostComponent = () => {
  const [selectedDate, setSelectedDate] = useState("")
  const [dateStirng, setDateString] = useState("")

  const handleChange = (selectedDate, dateStirng) => {
      setSelectedDate(selectedDate)
      setDateString(dateStirng)
  }

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Penilaian
          </h1>
          <DatePicker
          name="date"
          value={selectedDate}
          onChange={(selectedDate, dateString) => handleChange(selectedDate, dateString)}
          />
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table date={dateStirng}/>
        </div>
      </div>
    </div>
  );
};

export default PenilaianPostComponent;