import { Select } from "antd/lib";
import Table from "./Table";
import { Link } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";
import { useEffect, useState } from "react";
import { exportAttendance } from "../../../services/attendance.service";
import fs from "fs"

const AbsensiComponent = () => {
  const [selectedEkskul, setSelectedEkskul] = useState(null);
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
      const response = await exportAttendance(ekskul_id);
      
      // Log the response data to verify its content
  
      if (response) {
        // Create a Blob from the response data with the correct content type
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const outputFileName = `${Date.now().xlsx}`
  
        // Create an object URL from the Blob
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', outputFileName);
        document.body.appendChild(link);
        link.click();
  
        // Clean up the URL object after the download is initiated
        // window.URL.revokeObjectURL(url);
        fs.writeFileSync(outputFileName, response)
      } else {
        console.error('Export failed: Empty response data');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  useEffect(() => {

  }, [selectedEkskul])

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
              Export
          </button>
          <button
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            <Link to="/admin/absensi/tambah">Tambah Data</Link>
          </button>
          </div>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table/>
        </div>
      </div>
    </div>
  );
};

export default AbsensiComponent;