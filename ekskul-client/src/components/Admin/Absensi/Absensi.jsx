import { Select } from "antd/lib";
import Table from "./Table";
import { Link } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";
import { useEffect, useState } from "react";
import fs from "fs"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";

const AbsensiComponent = () => {
  const [selectedEkskul, setSelectedEkskul] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { profile } = useProfile();
  const ekskul_id = localStorage.getItem("ekskul_id")
  const handleInputChange = (value) => {
    if (localStorage.getItem("ekskul_id") !== null) {
      localStorage.removeItem("ekskul_id");
      localStorage.setItem("ekskul_id", value)
    } else {
      localStorage.setItem("ekskul_id", value)
    }

  }

  const handleExportExcel = async () => {
    try {
      const response = await axiosPrivate.get(`/attendance/export?ekskul_id=${ekskul_id}`, {
        responseType: 'blob', // Set the response type to 'blob'
      });
        
      if (response.data) {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const outputFileName = `data-absensi-${Date.now()}.xlsx`
  
        // Create an object URL from the Blob
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', outputFileName);
        document.body.appendChild(link);
        link.click();

        fs.writeFileSync(outputFileName, response.data)
      } else {
        console.error('Export failed: Empty response data');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  useEffect(() => {
    // Retrieve the ekskul_id from local storage on component mount
    const storedEkskulId = localStorage.getItem("ekskul_id");
    if (storedEkskulId) {
      setSelectedEkskul(storedEkskulId);
    }
  }, []);

  // const handleInputChange = (value) => {
  //   localStorage.setItem("ekskul_id", value);
  //   setSelectedEkskul(value);
  // };

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Absensi Siswa
          </h1>
          <div className="flex gap-3">
        <Select
            size="medium"
            placeholder="Pilih kategori"
            className=""
            value={selectedEkskul}
            onChange={(value) => {
              setSelectedEkskul(value)
              handleInputChange(value)
            }}
            options={profile.ekskul ? profile.ekskul.map((item) => ({
              value: item.id,
              label: item.name,
            })) : []}
            
          />
          <button onClick={handleExportExcel} className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500">
          <RiFileExcel2Line size={20} />
          </button>
          <button
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            <Link to="/admin/absensi-siswa/tambah">            <IoAddSharp size={20} />
</Link>
          </button>
          </div>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table selectedEkskul={selectedEkskul} />
        </div>
      </div>
    </div>
  );
};

export default AbsensiComponent;
