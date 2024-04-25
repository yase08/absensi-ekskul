import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Select, Input } from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";

const EkstrakurikulerComponent = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [formOld, setFormOld] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormOld({});
  };

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get("/ekskul");

      if (response.status === 200 && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const ekskulData = response.data.data;
          setData(ekskulData);
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
    setConfirmLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/ekskul/${formOld.id}`,
          formOld
        );
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        handleGetRequest();
        setFormOld(null);
        setOpen(false);
      } else {
        const response = await axiosPrivate.post("/ekskul", formData);
        const successMessage = response.data.statusMessage;
        setOpen(false);

        handleGetRequest();
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

  useEffect(() => {
    handleGetRequest();
  }, []);

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
        title={formOld && formOld.id ? "Edit Data" : "Tambah Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={false}
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
