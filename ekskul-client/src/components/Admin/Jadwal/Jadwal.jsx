import { useEffect, useState } from "react";
import TableJadwal from "./Table";
import Swal from "sweetalert2";
import { Modal, Select, TimePicker } from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IoAddSharp } from "react-icons/io5";
import dayjs from "dayjs";

const Jadwal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    ekskul_id: "",
    day: "",
    room_id: "",
    grade: "",
    startTime: "",
    endTime: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [ekskul, setEkskul] = useState([]);
  const [room, setRoom] = useState([]);
  const [formOld, setFormOld] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState([])
  // const [selectedDate, setSelectedDate] = useState()

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
    if (formOld) {
      if (inputName === "time") {
        const [startTime, endTime] = e;
        setFormOld((prevData) => ({
          ...prevData,
          startTime,
          endTime,
        }));
      } else {
        setFormOld((prevData) => ({
          ...prevData,
          [inputName]: newValue,
        }));
      }
    } else {
      setFormData((prevData) => {
        if (inputName === "time") {
          const [startTime, endTime] = e;
          return {
            ...prevData,
            startTime,
            endTime,
          };
        } else {
          return {
            ...prevData,
            [inputName]: newValue,
          };
        }
      });
    }}
    

  const inputSelectedDate = (date, dateString) => {
    setDate(date)
    handleInputChange(dateString, "time")
  }

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/activity`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const activityData = response.data.data;
          setData(activityData);
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

  const handleGetRoomRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/room`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const roomData = response.data.data;
          setRoom(roomData);
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

  const hari = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"];

  const hariOption = hari.map((item) => ({
    label: item,
    value: item,
  }));

  const ekskulOption = ekskul.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const roomOption = room.map((item) => ({
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
      if (formOld && formOld.id) {
        const response = await axiosPrivate.put(
          `/activity/${formOld.id}`,
          formOld
        );
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormOld({});
        handleGetRequest()
      } else {
        const response = await axiosPrivate.post(`/activity`, formData);
        const successMessage = response.data.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        handleGetRequest()
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

 useEffect(() => {
  if (formOld && !date.length) {
    const dayjsStartTime = dayjs(formOld.startTime, 'HH:mm:ss');
    const dayjsEndTime = dayjs(formOld.endTime, 'HH:mm:ss');

    setDate([dayjsStartTime, dayjsEndTime]);
  }
}, [formOld, date]);

  
  useEffect(() => {
    handleGetEkskulRequest();
    handleGetRoomRequest();
    handleGetRequest();
  }, []);
  
  

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Jadwal
          </h1>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            <IoAddSharp size={20} />
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <TableJadwal setFormOld={setFormOld} setOpen={setOpen} data={data} handleGetRequest={handleGetRequest} />
        </div>
      </div>
      <Modal
        title={formOld && formOld.id ? "Edit Data" : "Tambah Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-3">
          <label htmlFor="" className="text-lg">
            Hari
          </label>
          <Select
            size="large"
            className="w-full"
            value={formOld ? formOld.day : formData.day}
            onChange={(e) => handleInputChange(e, "day")}
            options={hariOption}
            placeholder="Pilih Hari"
          />
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
          <label htmlFor="" className="text-lg">
            Ekstrakurikuler
          </label>
          <Select
            size="large"
            className="w-full"
            placeholder="Pilih Ekstrakurikuler"
            value={formOld ? formOld.ekskul_id: formData.ekskul}
            onChange={(e) => handleInputChange(e, "ekskul_id")}
            options={ekskulOption}
          />
          <label htmlFor="" className="text-lg">
            Ruangan
          </label>
          <Select
            size="large"
            className="w-full"
            placeholder="Pilih Ruangan"
            value={formOld ? formOld.room_id : formData.room}
            onChange={(e) => handleInputChange(e, "room_id")}
            options={roomOption}
          />
          <label htmlFor="" className="text-lg">
            Jam Mulai & Jam Berakhir
          </label>
           <TimePicker.RangePicker
            size="large"
            format={"HH:mm"}
            onChange={(date, dateString) => inputSelectedDate(date, dateString)}
            placeholder={["Jam Mulai", "Jam Berakhir"]}
            value={date}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Jadwal
