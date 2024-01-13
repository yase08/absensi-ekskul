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
import dayjs from "dayjs";

const GalleryComponent = () => {
  const [open, setOpen] = useState(false);
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    ekskul_id: "",
    name: "",
  });
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [formOld, setFormOld] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState()
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
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

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/gallery`);
      console.log(response);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const galleryData = response.data.data;
          setData(galleryData);
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

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFile.append(key, value);
      });

      if (fileList.length > 0) {
        fileList.forEach((file, index) => {
          formDataWithFile.append("images", file.originFileObj); // Use "images" as the field name
        });
      }

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const apiEndpoint =
        formOld && formOld.id ? `/gallery/${formOld.id}` : "/gallery";
      const axiosMethod =
        formOld && formOld.id ? axiosPrivate.put : axiosPrivate.post;

      const response = await axiosMethod(
        apiEndpoint,
        formDataWithFile,
        axiosConfig
      );
      const successMessage = response.data.statusMessage;

      message.success(successMessage);
      handleGetRequest()
      setFormOld({});
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
    handleGetRequest();
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
          <Table
            setFormOld={setFormOld}
            setOpen={setOpen}
            data={data}
            handleGetRequest={handleGetRequest}
          />
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
            value={formOld && formOld.name ? formOld.name : formData.name}
          />
          <label htmlFor="" className="text-lg">
            Upload Gambar
          </label>
          <Upload
            showUploadList={true}
            multiple={true}
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
            value={formOld && formOld.ekskul_id ? formOld.ekskul_id : formData.ekskul_id} 
            onChange={(value) => handleInputChange(value, "ekskul_id")} 
            options={ekskulOption}
          />
          <label htmlFor="" className="text-lg">
            Tanggal
          </label>
          <DatePicker
            placeholder={"Pilih Tanggal"}
            size="large"
            name="date"
            onChange={(selectedDate, dateString) => {
              setSelectedDate(selectedDate);
              handleInputChange(dateString, "date");
            }}
            value={formOld && formOld.date ? dayjs(formOld.date) : selectedDate}
          />
        </form>
      </Modal>
    </div>
  );
};

export default GalleryComponent;
