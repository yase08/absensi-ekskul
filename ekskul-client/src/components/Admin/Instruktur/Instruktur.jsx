import Swal from "sweetalert2";
import Table from "./Table";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { DatePicker, Modal, Select } from "antd/lib";
import { IoAddSharp } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import fs from "fs";
import useAuth from "../../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const InstrukturComponent = () => {
  const { auth } = useAuth();
  const { id, ekskuls } = jwtDecode(auth.accessToken);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    instructor_id: id,
    ekskul_id: "",
    category: "",
    date: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const ekskulOption = ekskuls?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    setFormData((prevData) => ({
      ...prevData,
      [inputName]: newValue,
    }));
  };

  const handleDate = (dateStirng, selectedDate) => {
    setSelectedDate(selectedDate);
    handleInputChange(dateStirng, "date");
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate.post(
        `/instructor-attendance`,
        formData
      );
      const successMessage = response.data.data;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });
      handleGetRequest();
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const errorMessage = error.response.data.statusMessage;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
        });
      } else if (error.request) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "No response received from the server.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred.",
        });
      }
    } finally {
      setLoading(false);
      setConfirmLoading(false);
      setOpen(false);
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
            {auth.role === "instructor" && (
              <button
                onClick={showModal}
                className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
              >
                <IoAddSharp size={20} />
              </button>
            )}
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
        <Modal
          title={"Tambah Data"}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <form action="" className="flex flex-col p-5 gap-3">
            <label htmlFor="" className="text-lg">
              Ekskul
            </label>
            <Select
              className="w-full"
              size="large"
              placeholder="Pilih Jenis Kelamin"
              value={formData.ekskul_id}
              onChange={(e) => handleInputChange(e, "ekskul_id")}
              options={ekskulOption}
            />
            <label htmlFor="" className="text-lg">
              Kategori
            </label>
            <Select
              className="w-full"
              placeholder="Pilih Jenis Kelamin"
              size="large"
              value={formData.category}
              onChange={(e) => handleInputChange(e, "category")}
              options={[
                {
                  value: "hadir",
                  label: "Hadir",
                },
                {
                  value: "sakit",
                  label: "Sakit",
                },
                {
                  value: "izin",
                  label: "Izin",
                },
                {
                  value: "alfa",
                  label: "Alfa",
                },
              ]}
            />
            <label htmlFor="" className="text-lg">
              Tanggal
            </label>
            <DatePicker
              size="large"
              name="date"
              value={selectedDate}
              onChange={(selectedDate, dateString) =>
                handleDate(dateString, selectedDate)
              }
            />
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default InstrukturComponent;
