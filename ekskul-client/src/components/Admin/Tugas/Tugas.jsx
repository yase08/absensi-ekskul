import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Select, Input, DatePicker } from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const TugasComponent = () => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ekskul_id: "",
    date: "",
    grade: "",
  });
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [formOld, setFormOld] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ekskuls } = jwtDecode(auth.accessToken);
  const [selectedEkskul, setSelectedEkskul] = useState(null);

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    if (formOld) {
      setFormOld((prevData) => ({
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

  const ekskulOption = ekskuls.map((item) => ({
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
  };

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/task`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const taskData = response.data.data;
          setData(taskData);
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

  const handleSessionChange = (value) => {
    if (sessionStorage.getItem("ekskul_id") !== null) {
      sessionStorage.removeItem("ekskul_id");
      sessionStorage.setItem("ekskul_id", value);
    } else {
      sessionStorage.setItem("ekskul_id", value);
    }
  };

  const handleOk = async (event) => {
    setLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(`/task/${formOld.id}`, formOld);
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        event.preventDefault();
        setFormOld({});
        handleGetRequest();
      } else {
        const response = await axiosPrivate.post(`/task`, formData);
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        event.preventDefault();
        handleGetRequest();
      }
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
    handleGetRequest();
  }, []);

  useEffect(() => {
    if (formOld) {
      const ekskul = ekskuls.find((item) => item.id === formOld.ekskul_id);
      setFormOld((prevData) => ({
        ...prevData,
        ekskul: ekskul ? { id: ekskul.id, name: ekskul.name } : null,
      }));
    }
  }, [formOld, ekskuls]);

  useEffect(() => {
    const storedEkskulId = sessionStorage.getItem("ekskul_id");
    if (storedEkskulId) {
      setSelectedEkskul(storedEkskulId);
    }
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Tugas Siswa
          </h1>
          <div className="flex gap-2">
            {auth.role === "instructor" && (
              <>
                <Select
                  size="medium"
                  placeholder="Pilih kategori"
                  className=""
                  value={selectedEkskul}
                  onChange={(value) => {
                    setSelectedEkskul(value);
                    handleSessionChange(value);
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
                <button
                  onClick={showModal}
                  className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
                >
                  <IoAddSharp size={20} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table
            setFormOld={setFormOld}
            setOpen={setOpen}
            data={data}
            selectedEkskul={selectedEkskul}
            handleGetRequest={handleGetRequest}
          />
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
            value={
              formOld && formOld.ekskul ? formOld.ekskul_id : formData.ekskul
            }
            onChange={(e) => handleInputChange(e, "ekskul_id")}
            options={ekskulOption}
          />
          <label htmlFor="" className="text-lg">
            Tanggal
          </label>
          <DatePicker
            size="large"
            format="DD-MM-YYYY"
            placeholder="Masukan tanggal"
            name="date"
            value={
              formOld && formOld.date ? dayjs(formOld.date) : formData.date
            }
            onChange={(e) => handleInputChange(e, "date")}
          />
          <div>
            <label htmlFor="" className="text-lg">
              Kelas
            </label>
            <Select
              size="large"
              className="w-full"
              value={formOld ? formOld.grade : formData.grade}
              onChange={(e) => handleInputChange(e, "grade")}
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
              placeholder="Pilih Kelas"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TugasComponent;
