import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useProfile } from "../../../context/ProfileContext";
import { Modal, Select, Input, Upload, Button, Space } from "antd";
import { LuUpload } from "react-icons/lu";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UserComponent = () => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [ekskul, setEkskul] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "",
    ekskuls: [
      {
        ekskul_id: "",
      },
    ],
  });
  const [fileList, setFileList] = useState([]);
  const [formOld, setFormOld] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();
  const [onDataUpdate, setOnDataUpdate] = useState(false);

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

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFile.append(key, value);
      });

      // Append file if present
      if (fileList.length > 0) {
        formDataWithFile.append("image", fileList[0].originFileObj);
      }

      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/user/${formOld.id}`,
          formDataWithFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const successMessage = response.data;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });

        setOnDataUpdate((prev) => !prev);
        setFormOld({});
      } else {
        const response = await axiosPrivate.post("/user", formDataWithFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const successMessage = response.statusMessage;
        setOnDataUpdate((prev) => !prev);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });

        event.preventDefault();
      }
    } catch (error) {
      // Handle errors
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
            User
          </h1>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Add Data
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table
            setFormOld={setFormOld}
            setOpen={setOpen}
            onDataUpdate={setOnDataUpdate}
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
            Password
          </label>
          <Input.Password
            placeholder="Masukan Password"
            value={formOld ? formOld.password : formData.password}
            name="password"
            size="large"
            onChange={(e) => handleInputChange(e, "password")}
          />
          <label htmlFor="" className="text-lg">
            Foto Profil
          </label>
          <Upload
            onChange={handleFileChange}
            showUploadList={true}
            beforeUpload={() => false}
          >
            <Button icon={<LuUpload />}>Tekan Untuk Upload</Button>
          </Upload>
          <label htmlFor="" className="text-lg">
            Role
          </label>
          <Select
            className="w-full"
            placeholder="Pilih Role"
            size="large"
            value={formOld ? formOld.role : formData.role}
            onChange={(e) => handleInputChange(e, "role")}
            options={[
              {
                value: "instructor",
                label: "Instruktur",
              },
              {
                value: "admin",
                label: "Admin",
              },
            ]}
          />
          <label htmlFor="" className="text-lg">
            Eksktrakurikuler
          </label>
          <Select
            className="w-full"
            mode="multiple"
            size="large"
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

export default UserComponent;
