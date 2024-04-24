import Table from "./Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Select, Input, DatePicker } from "antd";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import useAuth from "../../../../hooks/useAuth";

const NilaiComponent = () => {
  const { auth } = useAuth();
  const task = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [ekskul, setEkskul] = useState([]);
  const [formOld, setFormOld] = useState({});
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    setFormOld((prevData) => ({
      ...prevData,
      [inputName]: newValue,
    }));
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

  const handleCancel = () => {
    setOpen(false);
    setFormOld({});
    console.log(formOld);
  };

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(
        `/assessment/detail?task_id=${task.id}`
      );

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const taskData = response.data.data;
          setData(taskData);
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
    setLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/assessment/${formOld.id}`,
          formOld
        );

        handleGetRequest();
        const successMessage = response.data.data;
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
    handleGetEkskulRequest();
    handleGetRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Penilaian Siswa
          </h1>
          {auth.role === "instructor" && (
            <Link
              to={`/admin/penugasan/penilaian/${task.id}`}
              className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
            >
              Penilaian
            </Link>
          )}
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
        title={"Edit Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-2">
          <label htmlFor="" className="text-lg">
            Nilai
          </label>
          <Input
            value={formOld && formOld.grade ? formOld.grade : ""}
            type="text"
            name="name"
            size="large"
            placeholder="Nilai"
            onChange={(e) => handleInputChange(e, "grade")}
          />
          <label htmlFor="" className="text-lg">
            Tanggal
          </label>
          <DatePicker
            name="date"
            value={formOld && formOld.date ? dayjs(formOld.date) : selectedDate}
            onChange={(selectedDate, dateString) => {
              setSelectedDate(selectedDate);
              handleInputChange(dateString, "date");
            }}
          />
        </form>
      </Modal>
    </div>
  );
};

export default NilaiComponent;
