import Table from "./Table";
import { useState } from "react";
import Swal from "sweetalert2";
import { createEkskul, updateEkskul } from "../../../services/ekskul.service";
import { Modal, Select, Input } from "antd";

const EkstrakurikulerComponent = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });
  const [formOld, setFormOld] = useState("");
  const [loading, setLoading] = useState(false);

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
        const response = await updateEkskul(formOld.id, formOld);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormOld({});
      } else {
        const response = await createEkskul(formData);
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

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Ekstrakurikuler
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
            Ekstrakurikuler
          </label>
          <Input
            value={formOld ? formOld.name : formData.name}
            type="text"
            name="name"
            size="large"
            id=""
            placeholder="Masukan nama ekstrakurikuler"
            onChange={(e) => handleInputChange(e, "name")}
          />
          <label htmlFor="" className="text-lg">
            Kategori
          </label>
          <Select
            size="large"
            placeholder="Pilih kategori"
            className="w-full"
            value={formOld ? formOld.category : formData.category}
            onChange={(value) => handleInputChange(value, "category")}
            options={[
              {
                value: "umum",
                label: "Umum",
              },
              {
                value: "produktif",
                label: "Produktif",
              },
              {
                value: "senbud",
                label: "Seni Budaya",
              },
            ]}
          />
        </form>
      </Modal>
    </div>
  );
};

export default EkstrakurikulerComponent;
