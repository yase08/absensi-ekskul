import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createStudent,
  updateStudent,
} from "../../../services/student.service";
import { getAllRombel } from "../../../services/rombel.service";
import { getAllRayon } from "../../../services/rayon.service";
import { getAllEkskul } from "../../../services/ekskul.service";
import { Modal, Select, Input } from "antd";

const SiswaComponent = () => {
  const [open, setOpen] = useState(false);
  const [rombel, setRombel] = useState([]);
  const [rayon, setRayon] = useState([]);
  const [ekskul, setEkskul] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nis: "",
    email: "",
    mobileNumber: "",
    gender: "",
    rombel_id: "",
    rayon_id: "",
    ekskuls: [
      {
        ekskul_id: "",
      }
    ],
  });
  const [formOld, setFormOld] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGetRombelRequest = async () => {
    try {
      const response = await getAllRombel();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rombelData = response.data;
          setRombel(rombelData);
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

  const handleGetRayonRequest = async () => {
    try {
      const response = await getAllRayon();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rayonData = response.data;
          setRayon(rayonData);
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

  const rombelOption = rombel.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const rayonOption = rayon.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const ekskulOption = ekskul.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await updateStudent(formOld.id, formOld);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormOld({});
      } else {
        const response = await createStudent(formData);
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

  useEffect(() => {
    handleGetRombelRequest();
    handleGetRayonRequest();
    handleGetEkskulRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Siswa
          </h1>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Add Data
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
            Nama
          </label>
          <Input
            value={formOld ? formOld.name : formData.name}
            type="text"
            name="name"
            size="large"
            placeholder="Masukan nama"
            onChange={(e) => handleInputChange(e, "name")}
          />
          <label htmlFor="" className="text-lg">
            Nis
          </label>
          <Input
            value={formOld ? formOld.nis : formData.nis}
            type="number"
            name="nis"
            size="large"
            placeholder="Masukan nis"
            onChange={(e) => handleInputChange(e, "nis")}
          />
          <label htmlFor="" className="text-lg">
            Email
          </label>
          <Input
            value={formOld ? formOld.email : formData.email}
            type="email"
            name="email"
            size="large"
            placeholder="Masukan email"
            onChange={(e) => handleInputChange(e, "email")}
          />
          <label htmlFor="" className="text-lg">
            Nomer Telpon
          </label>
          <Input
            value={formOld ? formOld.mobileNumber : formData.mobileNumber}
            type="number"
            name="mobileNumber"
            size="large"
            placeholder="Masukan nomer telpon"
            onChange={(e) => handleInputChange(e, "mobileNumber")}
          />
          <label htmlFor="" className="text-lg">
            Jenis Kelamin
          </label>
          <Select
            className="w-full"
            placeholder="Pilih Jenis Kelamin"
            value={formOld ? formOld.gender : formData.gender}
            onChange={(e) => handleInputChange(e, "gender")}
            options={[
              {
                value: "female",
                label: "Perempuan",
              },
              {
                value: "male",
                label: "Laki Laki",
              },
            ]}
          />
          <label htmlFor="" className="text-lg">
            Rombel
          </label>
          <Select
            className="w-full"
            value={formOld ? formOld.rombel : formData.rombel}
            onChange={(e) => handleInputChange(e, "rombel_id")}
            options={rombelOption}
            placeholder="Pilih Rombel"
          />
          <label htmlFor="" className="text-lg">
            Rayon
          </label>
          <Select
            className="w-full"
            value={formOld ? formOld.rayon : formData.rayon}
            onChange={(e) => handleInputChange(e, "rayon_id")}
            options={rayonOption}
            placeholder="Pilih Rayon"
          />
          <label htmlFor="" className="text-lg">
            Eksktrakurikuler
          </label>
          <Select
            className="w-full"
            mode="multiple"
            placeholder="Pilih Ekstrakurikuler"
            value={formOld ? formOld.ekskuls : formData.ekskuls}
            onChange={(e) => handleInputChange(e, "ekskuls")}
            options={ekskulOption}
          />
        </form>
      </Modal>
    </div>
  );
};

export default SiswaComponent;
