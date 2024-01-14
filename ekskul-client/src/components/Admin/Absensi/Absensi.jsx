import { Select } from "antd/lib";
import Table from "./Table";
import { Link } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";
import { useEffect, useState } from "react";

const AbsensiComponent = () => {
  const [selectedEkskul, setSelectedEkskul] = useState(null);
  const { profile } = useProfile();

  useEffect(() => {
    // Retrieve the ekskul_id from local storage on component mount
    const storedEkskulId = localStorage.getItem("ekskul_id");
    if (storedEkskulId) {
      setSelectedEkskul(storedEkskulId);
    }
  }, []);

  const handleInputChange = (value) => {
    localStorage.setItem("ekskul_id", value);
    setSelectedEkskul(value);
  };

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
              value={selectedEkskul}
              onChange={(value) => handleInputChange(value)}
              options={
                profile.ekskul
                  ? profile.ekskul.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))
                  : []
              }
            />
            <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500">
              <Link to="/admin/absensi-siswa/tambah">Tambah Data</Link>
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
