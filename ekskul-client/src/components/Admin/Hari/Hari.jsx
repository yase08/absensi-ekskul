import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Modal,  Input } from "antd";

const HariComponent = () => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    day: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
      setFormData((prevData) => ({
        ...prevData,
        [inputName]: newValue,
      }));
  };

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/schedule/day`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const scheduleData = response.data.data;
          setData(scheduleData);
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

  const handleGetEkskulRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/ekskul`);
      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const ekskulData = response.data.data;
          setEkskul(ekskulData);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({});
  };

  const handleOk = async (event) => {
    setLoading(true);

    try {
        const response = await axiosPrivate.post(`/schedule`, formData);
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: successMessage,
        });
        event.preventDefault();
        handleGetRequest()
    } catch (error) {
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
    handleGetEkskulRequest();
    handleGetRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Hari
          </h1>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Add Data
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table data={data} handleGetRequest={handleGetRequest} />
        </div>
      </div>
      <Modal
        title={"Tambah Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-2">
          <label htmlFor="" className="text-lg">
            Hari
          </label>
          <Input
            value={formData.day}
            type="text"
            name="day"
            size="large"
            placeholder="Masukan nama hari"
            onChange={(e) => handleInputChange(e, "day")}
          />
        </form>
      </Modal>
    </div>
  );
};

export default HariComponent;
