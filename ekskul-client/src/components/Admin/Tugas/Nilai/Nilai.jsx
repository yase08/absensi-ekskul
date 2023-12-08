import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import { createTask, updateTask } from "../../../services/task.service";
import { Modal, Select, Input } from "antd";
import { useProfile } from "../../../../context/ProfileContext";
import { getAllEkskul } from "../../../../services/ekskul.service";
import { updateAssessment } from "../../../../services/assessment.service";
import { useParams } from "react-router-dom";

const NilaiComponent = () => {
  const task = useParams()
  console.log(task.id);
  const [open, setOpen] = useState(false);
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ekskul_id: "",
  });
  const [formOld, setFormOld] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();

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
      const response = await getAllEkskul();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const ekskulData = response.data;
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
        const response = await updateAssessment(formOld.id, formOld);
        const successMessage = response.data;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        event.preventDefault();
        setFormOld({});
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
            Penilaian Siswa
          </h1>
          <a
            href={`/admin/penugasan/penilaian/${task.id}`}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Penilaian
          </a>
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
        </form>
      </Modal>
    </div>
  );
};

export default NilaiComponent;
