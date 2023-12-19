import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useProfile } from "../../../context/ProfileContext";
import { Modal, Select, Input, DatePicker } from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";

const TugasComponent = () => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ekskul_id: "",
    date: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateString, setDateString] = useState("");
  const [error, setError] = useState(null);
  const [formOld, setFormOld] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();

  const handleChange = (date, dateString) => {
    setSelectedDate(date);
    setDateString(dateString);
    setError(null);
  };

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    if (formOld) {
      setFormData((prevData) => ({
        ...prevData,
        [inputName]: newValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [inputName]: newValue,
      }));
    }
  };

  const handleGetEkskulRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/ekskul`);
      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const ekskulData = response.data.data;
          setEkskul(ekskulData);
        } else {
          console.log("Data is not an array");
        }
      } else {
        console.log("Data retrieval failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ekskulOption = ekskul.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormOld({});
    setFormData({});
    console.log(formOld, formData);
  };

  const handleOk = async (event) => {
    setLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(`/task`, formOld.id, formOld);
        const successMessage = response.data;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        event.preventDefault();
        setFormOld({});
      } else {
        const response = await axiosPrivate.post(`/task`, formData);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        event.preventDefault();
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

  useEffect(() => {
    profile;
    handleGetEkskulRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Tugas Siswa
          </h1>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            <IoAddSharp size={20} />
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table setFormOld={setFormOld} setOpen={setOpen} />
        </div>
      </div>
      <Modal
        title={formOld && formOld.id ? "Edit Data" : "Tambah Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-2">
          <label htmlFor="" className="text-lg">
            Tugas Siswa
          </label>
          <Input
            value={formOld ? formOld.name : formData.name}
            type="text"
            name="name"
            size="large"
            placeholder="Masukan nama tugas"
            onChange={(e) => handleInputChange(e, "name")}
          />
          <label htmlFor="" className="text-lg">
            Ekstrakurikuler
          </label>
          <Select
            size="large"
            placeholder="Pilih Ekstrakurikuler"
            className="w-full"
            value={formOld ? formOld.ekskul_id : formData.ekskul_id}
            onChange={(value) => handleInputChange(value, "ekskul_id")}
            options={ekskulOption}
          />
          <label htmlFor="" className="text-lg">
            Ekstrakurikuler
          </label>
          <DatePicker
            size="large"
            name="date"
            value={selectedDate}
            onChange={handleChange}
          />
        </form>
      </Modal>
    </div>
  );
};

export default TugasComponent;
