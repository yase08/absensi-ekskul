import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Modal,
  Select,
  Upload,
  Button,
  DatePicker,
  message,
  Input,
} from "antd";
import { LuUpload } from "react-icons/lu";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Table from "./Table";
import { IoAddSharp } from "react-icons/io5";

const GalleryComponent = () => {
  const [open, setOpen] = useState(false);
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    date: null,
    ekskul_id: "",
    name: "",
  });
  const [fileList, setFileList] = useState([]);
  const [formOld, setFormOld] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
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
    setFileList([]);
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formDataWithFile = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFile.append(key, value);
      });

      if (fileList.length > 0) {
        formDataWithFile.append("image", fileList[0].originFileObj);
      }

      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/gallery/${formOld.id}`,
          formDataWithFile
        );
        const successMessage = response.data.statusMessage; // Use the correct property

        message.success(successMessage);
        setFormOld({});
      } else {
        const response = await axiosPrivate.post(`/gallery`, formDataWithFile);
        const successMessage = response.data.statusMessage; // Use the correct property

        message.success(successMessage);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const errorMessage = error.response.data.message; // Use the correct property
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
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Galeri
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
        open={open}
        title={formOld && formOld.id ? "Edit Data" : "Tambah Data"}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-2">
          <label htmlFor="" className="text-lg">
            Nama
          </label>
          <Input
            placeholder={"Masukan Nama Galeri"}
            size="large"
            name="name"
            onChange={(value) => handleInputChange(value, "name")}
            value={formOld ? formOld.name : formData.name}
          />
          <label htmlFor="" className="text-lg">
            Upload Gambar
          </label>
          <Upload
            showUploadList={true}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<LuUpload />}>Tekan Untuk Upload</Button>
          </Upload>
          <label htmlFor="" className="text-lg">
            Eksktrakurikuler
          </label>
          <Select
            className="w-full"
            size="large"
            placeholder="Pilih Ekstrakurikuler"
            value={formOld ? formOld.ekskul_id : formData.ekskul_id} // Use plural form
            onChange={(value) => handleInputChange(value, "ekskul_id")} // Use plural form
            options={ekskulOption}
          />
          <label htmlFor="" className="text-lg">
            Tanggal
          </label>
          <DatePicker
            placeholder={"Pilih Tanggal"}
            size="large"
            name="date"
            onChange={(value) => handleInputChange(value, "date")} // Use the correct property
            value={formOld ? formOld.date : formData.date} // Use the correct property
          />
        </form>
      </Modal>
    </div>
  );
};

export default GalleryComponent;
