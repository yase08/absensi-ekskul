import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useProfile } from "../../../context/ProfileContext";
import { Modal, Select, Upload, Button, DatePicker } from "antd";
import { LuUpload } from "react-icons/lu";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const GalleryComponent = () => {
  const [open, setOpen] = useState(false);
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    ekskul_id: "",
    images: [],
  });
  const [fileList, setFileList] = useState([]);
  const [formOld, setFormOld] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();
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
          `/gallery`,
          formOld.id,
          formDataWithFile
        );
        const successMessage = response.data;

        message.success(successMessage);
        setFormOld({});
      } else {
        console.log(formDataWithFile);
        const response = await axiosPrivate.post(`/gallery`, formDataWithFile);
        const successMessage = response.statusMessage;

        message.success(successMessage);
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
            Gallery
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
            Upload Gambar
          </label>
          <Upload>
            <Button onChange={handleFileChange} icon={<LuUpload />}>
              Tekan Untuk Upload
            </Button>
          </Upload>
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
          <DatePicker
            placeholder={"Pilih Tanggal"}
            size="large"
            name="date"
            onChange={handleInputChange}
            value={formOld ? formOld.date : formData.date}
          />
        </form>
      </Modal>
    </div>
  );
};

export default GalleryComponent;
