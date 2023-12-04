import { useState } from "react";
import TableProgram from "./Table";
import Swal from "sweetalert2";
import {
  createActivityProgram,
  updateActivityProgram,
} from "../../../services/activityProgram.service";
import { Modal, DatePicker, Input } from "antd";
const { RangePicker } = DatePicker;

const Program = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    activity: "",
    task: "",
    startDate: "",
    endDate: "",
  });
  const [formOld, setFormOld] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    if (formOld) {
      setFormOld({
        ...formOld,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formOld && formOld.id) {
        const response = await updateActivityProgram(formOld.id, formOld);
        const successMessage = response.statusMessage;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: successMessage,
        });
        setFormOld({});
      } else {
        const response = await createActivityProgram(formData);
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

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Program
          </h1>
          <button
            onClick={showModal}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Add Data
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <TableProgram setFormOld={setFormOld} setOpen={setOpen} />
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
            Nama
          </label>
          <Input
            value={formOld ? formOld.name : formData.name}
            type="text"
            name="activity"
            size="large"
            placeholder="Masukan nama"
            onChange={handleInputChange}
          />
          <label htmlFor="" className="text-lg">
            Tugas
          </label>
          <Input
            value={formOld ? formOld.task : formData.task}
            type="text"
            name="task"
            size="large"
            placeholder="Masukan Nama Tugas"
            onChange={handleInputChange}
          />
          <label htmlFor="" className="text-lg">
            Tanggal Mulai & Tanggal Berakhir
          </label>
          <RangePicker
            placeholder={["Tanggal Mulai", "Tanggal Berakhir"]}
            size="large"
            name="date"
            onChange={handleInputChange}
            value={
              formOld
                ? [formOld.startDate, formOld.endDate]
                : [formData.startDate, formData.endDate]
            }
          />
        </form>
      </Modal>
    </div>
  );
};

export default Program;
