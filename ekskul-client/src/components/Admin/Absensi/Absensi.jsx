import { Select } from "antd/lib";
import Table from "./Table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fs from "fs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const AbsensiComponent = () => {
  const [selectedEkskul, setSelectedEkskul] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { ekskuls } = jwtDecode(auth.accessToken);
  console.log()
  // Get ekskul_id from sessionStorage
  const ekskul_id = sessionStorage.getItem("ekskul_id");

  // Function to handle input change and update sessionStorage
  const handleSessionEkskul = (value) => {
    if (sessionStorage.getItem("ekskul_id") !== null) {
      sessionStorage.removeItem("ekskul_id");
      sessionStorage.setItem("ekskul_id", value);
    } else {
      sessionStorage.setItem("ekskul_id", value);
    }
  };

  const handleSessionGrade = (value) => {
    if (sessionStorage.getItem("grade") !== null) {
      sessionStorage.removeItem("grade");
      sessionStorage.setItem("grade", value);
    } else {
      sessionStorage.setItem("grade", value);
    }
  };

  const handleExportExcelByInstructor = async () => {
    try {
      const response = await axiosPrivate.get(
        `/attendance/export/instructor?ekskul_id=${ekskul_id}&grade=${selectedGrade}`,
        {
          responseType: "blob", // Set the response type to 'blob'
        }
      );

      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const outputFileName = `data-absensi-${Date.now()}.xlsx`;

        // Create an object URL from the Blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", outputFileName);
        document.body.appendChild(link);
        link.click();

        fs.writeFileSync(outputFileName, response.data);
      } else {
        console.error("Export failed: Empty response data");
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await axiosPrivate.get(`/attendance/export`, {
        responseType: "blob", // Set the response type to 'blob'
      });

      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const outputFileName = `data-absensi-${Date.now()}.xlsx`;

        // Create an object URL from the Blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", outputFileName);
        document.body.appendChild(link);
        link.click();

        fs.writeFileSync(outputFileName, response.data);
      } else {
        console.error("Export failed: Empty response data");
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  useEffect(() => {
    const storedEkskulId = sessionStorage.getItem("ekskul_id");
    if (storedEkskulId) {
      setSelectedEkskul(storedEkskulId);
    }

    const storedGrade = sessionStorage.getItem("grade");
    if (storedGrade) {
      setSelectedGrade(storedGrade);
    }
  }, [selectedEkskul, selectedGrade]);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Absensi Siswa
          </h1>
          <div className="flex gap-3">
            {auth.role === "instructor" && (
              <>
                <Select
                  size="medium"
                  placeholder="Pilih kategori"
                  className=""
                  value={selectedEkskul}
                  onChange={(value) => {
                    setSelectedEkskul(value);
                    handleSessionEkskul(value);
                  }}
                  options={
                    ekskuls
                      ? ekskuls.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))
                      : []
                  }
                />
                <Select
                  size="medium"
                  placeholder="Pilih kelas"
                  value={selectedGrade}
                  onChange={(value) => {
                    setSelectedGrade(value);
                    handleSessionGrade(value);
                  }}
                  options={[
                    {
                      label: "X",
                      value: "X",
                    },
                    {
                      label: "XI",
                      value: "XI",
                    },
                    {
                      label: "XII",
                      value: "XII",
                    },
                  ]}
                />
                {selectedEkskul && selectedGrade && (
                  <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500">
                    <Link to="/admin/absensi-siswa/tambah">
                      <IoAddSharp size={20} />
                    </Link>
                  </button>
                )}
              </>
            )}
            {auth.role === "admin" && (
              <button
                onClick={handleExportExcel}
                className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
              >
                <RiFileExcel2Line size={20} />
              </button>
            )}
            {auth.role === "instructor" && selectedEkskul && selectedGrade && (
              <button
                onClick={handleExportExcelByInstructor}
                className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
              >
                <RiFileExcel2Line size={20} />
              </button>
            )}
          </div>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table
            selectedEkskul={selectedEkskul}
            selectedGrade={selectedGrade}
          />
        </div>
      </div>
    </div>
  );
};

export default AbsensiComponent;
