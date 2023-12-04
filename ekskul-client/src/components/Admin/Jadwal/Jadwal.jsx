import Table from "./Table";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getAllRoom } from "../../../services/room.service";
import { getAllSchedule } from "../../../services/schedule.service";
import { getAllRombel } from "../../../services/rombel.service";
import { getAllEkskul } from "../../../services/ekskul.service";
import { createActivity } from "../../../services/activity.service";

const Ekstrakulikuler = () => {
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    rombel: {
      id: "",
      name: "",
    },
    room: {
      id: "",
      name: "",
    },
    ekskul: {
      id: "",
      name: "",
    },
    schedule: {
      id: "",
      name: "",
    },
  });
  const [formOld, setFormOld] = useState({});
  const [rombel, setRombel] = useState({});
  const [schedule, setSchedule] = useState({});
  const [room, setRoom] = useState({});
  const [ekskul, setEkskul] = useState({});
  // const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (
      name === "rombel" ||
      name === "ekskul" ||
      name === "schedule" ||
      name === "room"
    ) {
      if (formOld) {
        setFormOld({
          ...formOld,
          [name]: {
            id: value,
            name: "",
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: {
            id: value,
            name: "",
          },
        });
      }
    } else {
      if (formOld) {
        setFormOld({
          ...formOld,
          [name]: value,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  const handleGetRombelRequest = async () => {
    try {
      const response = await getAllRombel({
        filter: "",
        number: "",
        size: "",
        sort: "",
      });

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          const rombelData = response.data;
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

  const handleGetRoomRequest = async () => {
    try {
      const response = await getAllRoom({
        filter: "",
        number: "",
        size: "",
        sort: "",
      });

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          const roomData = response.data;
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

  const handleGetScheduleRequest = async () => {
    try {
      const response = await getAllSchedule({
        filter: "",
        number: "",
        size: "",
        sort: "",
      });

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          const scheduleData = response.data;
          setSchedule(scheduleData);
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
      const response = await getAllEkskul({
        filter: "",
        number: "",
        size: "",
        sort: "",
      });

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          const ekskulData = response.data;
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

  const handlePostRequest = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { rombel, rayon, ...otherFormData } = formData;
      console.log(formData);
      const response = await createActivity({
        ...otherFormData,
        rombel_id: formData.rombel.id,
        room_id: formData.room.id,
        schedule_id: formData.schedule.id,
        ekskul_id: formData.ekskul.id,
      });
      console.log(formData);
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Berhasil Membuat Siswa Baru!",
        text: successMessage,
      });
      setOpen(!isOpen);
      setFormData({
        startTime: "",
        endTime: "",
        rombel_id: "",
        room_id: "",
        schedule_id: "",
        ekskul_id: "",
      });
      console.log("Response:", response.data);
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
    }
  };

  const handleUpdateRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formOld);

    try {
      const response = await updateStudent(formOld.id, {
        ...formOld,
        rayon_id: formOld.rayon.id,
        rombel_id: formOld.rombel.id,
      });
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });
      setFormOld("");
      setOpen(!isOpen);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const errorMessage = error.response.statusMessage;
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
    }
  };

  const toggleExpansion = () => {
    setOpen(!isOpen);
    if (formOld) {
      setFormOld("");
    }
  };

  useEffect(() => {
    handleGetRombelRequest();
    handleGetRoomRequest();
    handleGetScheduleRequest();
    handleGetEkskulRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Jadwal
          </h1>
          <button
            onClick={toggleExpansion}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Tambah
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table />
        </div>
      </div>
      {isOpen && (
        <div
          className="bg-transparent flex items-center justify-center w-full absolute top-0 left-0 h-full z-50"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="bg-light w-[600px] h-auto border shadow-md">
            <div className="flex justify-between p-5 border-b border-gray-300  relative group">
              <p className="font-semibold opacity-70">Tambahkan Jadwal</p>
              <button onClick={toggleExpansion}>
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>
            <div className="w-full h-full">
              <form action="" className="flex flex-col p-5 gap-2">
                <label htmlFor="" className="text-xl">
                  Waktu Mulai
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formOld ? formOld.startTime : formData.startTime}
                  onChange={handleInputChange}
                  id=""
                  placeholder="Masukan tanggal mulai"
                  className="bg-transparent outline-none border p-3 rounded-md border-gray-400"
                />
                <label htmlFor="" className="text-xl">
                  Waktu Berakhir
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formOld ? formOld.endTime : formData.endTime}
                  onChange={handleInputChange}
                  id=""
                  placeholder="Masukan tanggal berakhir"
                  className="bg-transparent outline-none border p-3 rounded-md border-gray-400"
                />
                <div className="flex gap-5">
                  <div className="flex gap-2 flex-col w-full">
                    <label htmlFor="" className="text-xl">
                      Hari
                    </label>
                    <select
                      name="schedule"
                      value={
                        formOld ? formOld.schedule.id : formData.schedule.id
                      }
                      className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                      onChange={handleInputChange}
                    >
                      <option selected disabled value="">
                        Masukan Hari
                      </option>
                      {schedule.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.day}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex gap-2 flex-col w-full">
                    <label htmlFor="" className="text-xl">
                      Rombel
                    </label>
                    <select
                      name="rombel"
                      value={formOld ? formOld.rombel.id : formData.rombel.id}
                      className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                      onChange={handleInputChange}
                    >
                      <option selected disabled value="">
                        Masukan Rombel
                      </option>
                      {rombel.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex gap-2 flex-col w-full">
                    <label htmlFor="" className="text-xl">
                      Room
                    </label>
                    <select
                      name="room"
                      value={formOld ? formOld.room.id : formData.room.id}
                      className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                      onChange={handleInputChange}
                    >
                      <option selected disabled value="">
                        Masukan Room
                      </option>
                      {room.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex gap-2 flex-col w-full">
                    <label htmlFor="" className="text-xl">
                      Ekskul
                    </label>
                    <select
                      name="ekskul"
                      value={formOld ? formOld.ekskul.id : formData.ekskul.id}
                      className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                      onChange={handleInputChange}
                    >
                      <option selected disabled value="">
                        Masukan Ekskul
                      </option>
                      {ekskul.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <button
                  className="bg-blue-500 p-2 mt-4 rounded-md text-white"
                  onClick={formOld ? handleUpdateRequest : handlePostRequest}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ekstrakulikuler;
