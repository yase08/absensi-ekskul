import { DatePicker } from "antd";
import Table from "./Table";
import { useState } from "react";

const PenilaianPostComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateString, setDateString] = useState("");

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    setDateString(dateString);
  };
  var oldDate = dateString.split("-");
  var date = new Date(oldDate[2], oldDate[1] - 1, oldDate[0]).getTime();

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Penilaian
          </h1>
          <DatePicker
            size="large"
            format="DD-MM-YYYY"
            placeholder="Masukan tanggal"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table date={date} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default PenilaianPostComponent;
