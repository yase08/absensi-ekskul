import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Select, Input } from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const EkstrakurikulerComponent = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });
  const [formOld, setFormOld] = useState("");
  const [editFormData, setEditFormData] = useState(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormOld({});
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setConfirmLoading(true);

    try {
      if (editFormData && editFormData.id) {
        const response = await axiosPrivate.put(
          `/ekskul/${editFormData.id}`,
          editFormData
        );
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setEditFormData(null);
      } else {
        const response = await axiosPrivate.post(`/ekskul`, formData);
        const successMessage = response.data.statusMessage;
        setOpen(false);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
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

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    if (editFormData) {
      setEditFormData((prevData) => ({
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
