import Swal from "sweetalert2";
import Table from "./Table";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Modal, Select } from "antd/lib";
import { IoAddSharp } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import fs from "fs";
import useAuth from "../../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const InstrukturComponent = () => {
  const date = new Date();
  const options = {
    timeZone: "Asia/Jakarta",
  };
  const { auth } = useAuth();
  const { id, ekskuls } = jwtDecode(auth.accessToken);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get("/instructor-attendance");

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const attendanceData = response.data.data;
          setData(attendanceData);
        } else {
          setError(new Error("Data is not an array"));
        }
      } else {
        setError(new Error("Data retrieval failed"));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await axiosPrivate.get(`/instructor-attendance/export`, {
        responseType: "blob", // Set the response type to 'blob'
      });

      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const outputFileName = `data-absensi-instruktur-${Date.now()}.xlsx`;

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
    handleGetRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Absensi Instruktur
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportExcel}
              className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
            >
              <RiFileExcel2Line size={20} />
            </button>
          </div>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table data={data} handleGetRequest={handleGetRequest} />
        </div>
      </div>
    </div>
  );
};

export default InstrukturComponent;
