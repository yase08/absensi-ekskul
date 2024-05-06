import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Select, Input, Button, Upload } from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineFileExcel } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { LuUpload } from "react-icons/lu";
import { FaFileImport } from "react-icons/fa";

const SiswaComponent = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingImport, setConfirmLoadingImport] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [rombel, setRombel] = useState([]);
  const [rayon, setRayon] = useState([]);
  const [ekskul, setEkskul] = useState([]);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nis: "",
    email: "",
    mobileNumber: "",
    gender: "",
    rombel_id: "",
    grade: "",
    rayon_id: "",
    ekskuls: [
      {
        ekskul_id: "",
      },
    ],
  });
  const [formOld, setFormOld] = useState();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/student`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const studentData = response.data.data;
          setData(studentData);
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

  const handleGetRombelRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/rombel`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const rombelData = response.data.data;
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
      const response = await axiosPrivate.get(`/rayon`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const rayonData = response.data.data;
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

  const showModalImport = () => {
    setOpenImport(true);
  };

  const handleCancelImport = () => {
    setOpenImport(false);
  };

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
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/student/${formOld.id}`,
          formOld
        );
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: successMessage,
        });
        handleGetRequest();
        setFormOld({});
      } else {
        const response = await axiosPrivate.post(`/student`, formData);
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormData({});
        handleGetRequest();
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.data;
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

  const handleAllExportExcel = async () => {
    try {
      const response = await axiosPrivate.get(`/student/export-all`, {
        responseType: "blob",
      });

      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const outputFileName = `data-siswa-${Date.now()}.xlsx`;

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", outputFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Export failed: Empty response data");
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleImportExcel = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("file", fileList[0].originFileObj);

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const apiEndpoint = "/student/import";
      const response = await axiosPrivate.post(
        apiEndpoint,
        formDataWithFile,
        axiosConfig
      );

      const successMessage = response.data.statusMessage;
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });

      event.preventDefault();
      handleGetRequest();
      setFormOld({});
    } catch (error) {
    } finally {
      setLoading(false);
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    handleGetRombelRequest();
    handleGetRayonRequest();
    handleGetEkskulRequest();
    handleGetRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Siswa
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleAllExportExcel}
              className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
              title="Export All Data to Excel"
            >
              <AiOutlineFileExcel size={20} />
            </button>
            {auth.role === "admin" && (
              <button
                onClick={showModalImport}
                className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
                title="Import Data from Excel"
              >
                <FaFileImport size={20} />
              </button>
            )}
            <button
              onClick={showModal}
              className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
              title="Add New Item"
            >
              <IoAddSharp size={20} />
            </button>
          </div>
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
        title={formOld && formOld.id ? "Edit Data" : "Tambah Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="grid grid-cols-2 p-5 gap-2">
          <div>
            <label htmlFor="" className="text-lg">
              Nama
            </label>
            <Input
              value={formOld ? formOld.name : formData.name}
              type="text"
              name="name"
              rules={{ required: true, message: "Nama Siswa Harus Diisi!" }}
              size="large"
              placeholder="Masukan nama"
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Nis
            </label>
            <Input
              value={formOld ? formOld.nis : formData.nis}
              type="number"
              name="nis"
              rules={{ required: true, message: "Nis Siswa Harus Diisi!" }}
              size="large"
              placeholder="Masukan nis"
              onChange={(e) => handleInputChange(e, "nis")}
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Email
            </label>
            <Input
              value={formOld ? formOld.email : formData.email}
              type="email"
              name="email"
              rules={{ required: true, message: "Email Siswa Harus Diisi!" }}
              size="large"
              placeholder="Masukan email"
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Nomer Telpon
            </label>
            <Input
              value={formOld ? formOld.mobileNumber : formData.mobileNumber}
              type="number"
              rules={{
                required: true,
                message: "Nomer Telpon Siswa Harus Diisi!",
              }}
              name="mobileNumber"
              size="large"
              placeholder="Masukan nomer telpon"
              onChange={(e) => handleInputChange(e, "mobileNumber")}
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Jenis Kelamin
            </label>
            <Select
              size="large"
              className="w-full"
              rules={{ required: true, message: "Jenis Kelamin Harus Diisi!" }}
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
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Rombel
            </label>
            <Select
              size="large"
              className="w-full"
              value={formOld ? formOld.rombel_id : formData.rombel}
              onChange={(e) => handleInputChange(e, "rombel_id")}
              options={rombelOption}
              placeholder="Pilih Rombel"
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Rayon
            </label>
            <Select
              size="large"
              rules={{ required: true, message: "Rayon Siswa Harus Diisi!" }}
              className="w-full"
              value={formOld ? formOld.rayon_id : formData.rayon}
              onChange={(e) => handleInputChange(e, "rayon_id")}
              options={rayonOption}
              placeholder="Pilih Rayon"
            />
          </div>
          <div>
            <label htmlFor="" className="text-lg">
              Eksktrakurikuler
            </label>
            <Select
              size="large"
              className="w-full"
              mode="multiple"
              rules={{
                required: true,
                message: "Ekstrakurikuler Siswa Harus Diisi!",
              }}
              placeholder="Pilih Ekstrakurikuler"
              value={formOld ? formOld.ekskuls : formData.ekskuls}
              onChange={(e) => handleInputChange(e, "ekskuls")}
              options={ekskulOption}
            />
          </div>
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
      <Modal
        title="Masukkan file Excel yang akan diimpor"
        onOk={handleImportExcel}
        confirmLoading={confirmLoadingImport}
        onCancel={handleCancelImport}
        open={openImport}
      >
        <form action="" className="flex w-full items-center justify-center">
          <div className="flex flex-col">
            <Upload
              onChange={handleFileChange}
              showUploadList={true}
              beforeUpload={() => false}
            >
              <Button icon={<LuUpload />}>Tekan Untuk Upload</Button>
            </Upload>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SiswaComponent;
