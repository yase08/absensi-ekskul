import { useEffect, useState } from "react";
import TableProgram from "./Table";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Modal, DatePicker, Input } from "antd";
import { IoAddSharp } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const Program = () => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    activity: "",
    task: "",
    startDate: "",
    endDate: "",
  });
  const [formOld, setFormOld] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState()

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    if (formOld) {
      if (inputName === "date") {
        const [startDate, endDate] = e; // Destructuring e into startDate and endDate
        setFormOld((prevData) => ({
          ...prevData,
          startDate,
          endDate,
        }));
      } else {
        setFormOld((prevData) => ({
          ...prevData,
          [inputName]: newValue,
        }));
      }
    } else {
      setFormData((prevData) => {
        if (inputName === "date") {
          const [startDate, endDate] = e; // Destructuring e into startDate and endDate
          return {
            ...prevData,
            startDate,
            endDate,
          };
        } else {
          return {
            ...prevData,
            [inputName]: newValue,
          };
        }
      });
    }
  };
  

  const selectedDate = (date, dateString) => {
    setDate(date)
    handleInputChange(dateString, "date")
    console.log(date);
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormOld({});
    setFormData({});
    setDate([])
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/activity-program/${formOld.id}`,
          formOld
        );
        const successMessage = response.statusMessage;
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormOld({});
      } else {
        const response = await axiosPrivate.post(`/activity-program`, formData);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
      }
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
      const response = await axiosPrivate.get(`/activity-program/export`, {
        responseType: 'blob', // Set the response type to 'blob'
      });
        
      if (response.data) {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const outputFileName = `data-aktivitas-${Date.now()}.xlsx`
  
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
    if (formOld) {
      const dayjsStartDate = dayjs(formOld.startDate);
      const dayjsEndDate = dayjs(formOld.endDate);
    
      setDate([dayjsStartDate, dayjsEndDate]);
    }
  }, [formOld.startDate, formOld.endDate]);
  

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Program
          </h1>
          <div className="flex gap-3">
          <button onClick={handleExportExcel} className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500">
          <RiFileExcel2Line size={20} />
          </button>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            <IoAddSharp size={20} />
          </button>
          </div>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <TableProgram setFormOld={setFormOld} setOpen={setOpen} />
        </div>
      </div>
      <Modal
        title={formOld && formOld.id ? "Edit Data" : "Tambah Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-3">
          <label htmlFor="" className="text-lg">
            Aktivitas
          </label>
          <Input
            value={formOld ? formOld.activity : formData.activity}
            type="text"
            name="activity"
            size="large"
            placeholder="Masukan nama"
            onChange={(e) => handleInputChange(e, "activity")}
          />
          <label htmlFor="" className="text-lg">
            Tugas
          </label>
          <Input
            value={formOld ? formOld.task : formData.task}
            type="text"
            name="task"
            size="large"
            placeholder="Masukan Nama Tugas"
            onChange={(e) => handleInputChange(e, "task")}
          />
          <label htmlFor="" className="text-lg">
            Tanggal Mulai & Tanggal Berakhir
          </label>
          <RangePicker
            placeholder={["Tanggal Mulai", "Tanggal Berakhir"]}
            size="large"
            name="date"
            onChange={(date, dateString) => selectedDate(date, dateString)}
            value={date}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Program;
