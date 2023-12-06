import { useEffect, useState } from "react";
import TableJadwal from "./Table";
import Swal from "sweetalert2";
import {
  createActivity,
  updateActivity,
} from "../../../services/activity.service";
import { Modal, Select, TimePicker } from "antd";
import { getAllRombel } from "../../../services/rombel.service";
import { getAllEkskul } from "../../../services/ekskul.service";
import { getAllRoom } from "../../../services/room.service";
import { getDay } from "../../../services/schedule.service";

const Jadwal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    ekskul_id: "",
    schedule_id: "",
    room_id: "",
    rombel_id: "",
    // startTime: "",
    // endTime: "",
    // time: "",
  });
  const [rombel, setRombel] = useState([]);
  const [hari, setHari] = useState([]);
  const [ekskul, setEkskul] = useState([]);
  const [room, setRoom] = useState([]);
  const [formOld, setFormOld] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleGetRombelRequest = async () => {
    try {
      const response = await getAllRombel();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

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
      const response = await getAllRoom();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

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

  const handleGetHariRequest = async () => {
    try {
      const response = await getDay();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const hariData = response.data;
          setHari(hariData);
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
      const response = await getAllEkskul();

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

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

  const rombelOption = rombel.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const hariOption = hari.map((item) => ({
    label: item.day,
    value: item.id,
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
        const response = await updateActivity(formOld.id, formOld);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormOld({});
      } else {
        const response = await createActivity(formData);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
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
    handleGetHariRequest();
    handleGetRoomRequest();
    handleGetRombelRequest();
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
            Add Data
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <TableJadwal setFormOld={setFormOld} setOpen={setOpen} />
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
            value={formOld ? formOld.schedule : formData.schedule}
            onChange={(e) => handleInputChange(e, "schedule_id")}
            options={hariOption}
            placeholder="Pilih Hari"
          />
          <label htmlFor="" className="text-lg">
            Rombel
          </label>
          <Select
            size="large"
            className="w-full"
            value={formOld ? formOld.rombel : formData.rombel}
            onChange={(e) => handleInputChange(e, "rombel_id")}
            options={rombelOption}
            placeholder="Pilih Rombel"
          />
          <label htmlFor="" className="text-lg">
            Ekstrakurikuler
          </label>
          <Select
            size="large"
            className="w-full"
            placeholder="Pilih Ekstrakurikuler"
            value={formOld ? formOld.ekskul : formData.ekskul}
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
            value={formOld ? formOld.room : formData.room}
            onChange={(e) => handleInputChange(e, "room_id")}
            options={roomOption}
          />
          <label htmlFor="" className="text-lg">
            Jam Mulai & Jam Berakhir
          </label>
          {/* <TimePicker.RangePicker
            size="large"
            format={"HH:mm"}
            onChange={(e) => handleInputChange(e, "time")}
            placeholder={["Jam Mulai", "Jam Berakhir"]}
            value={
              formOld
                ? [formOld.startTime, formOld.endTime]
                : [formData.startTime, formData.endTime]
            }
          /> */}
        </form>
      </Modal>
    </div>
  );
};

export default Jadwal;
