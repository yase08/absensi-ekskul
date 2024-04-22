import { DatePicker, Alert } from "antd/lib";
import Table from "./Table";
import { useState } from "react";

const AbsensiPostComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateString, setDateString] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (date, dateString) => {
    setSelectedDate(date);
    setDateString(dateString);
    setError(null); // Clear error when a date is selected
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      setError("Tanggal Harus Diisi.");
      return;
    }
    setError(null);
  };

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Absensi
          </h1>
          <DatePicker
            name="date"
            value={selectedDate}
            onChange={handleChange}
          />
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table date={dateString} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default AbsensiPostComponent;
