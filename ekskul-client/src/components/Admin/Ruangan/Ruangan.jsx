import { useState } from "react";
import TableEskul from "./Table";
import Swal from "sweetalert2";
import "./Ruangan.css"; // Import a CSS file for styling (create this file if not already present)
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from "react";

const Ruangan = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formOld, setFormOld] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    if (formOld) {
      setFormOld({
        id: formOld.id,
        name: e.target.value,
        createdAt: formOld.createdAt,
        updatedAt: formOld.updatedAt,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/room`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const roomData = response.data.data;
          setData(roomData);
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


  const handlePostRequest = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate.post(`/room`, formData);
      const successMessage = response.data.statusMessage;

      handleGetRequest()
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });
      console.log("Response:", response.data);
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

  const handleUpdateRequest = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosPrivate.put(`/room/${formOld.id}`, formOld);
      const successMessage = response.statusMessage;

      handleGetRequest()

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });
      setFormOld("");
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

  useEffect(() => {
    handleGetRequest()
  }, [])

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
          Ruangan
        </h1>
        <div className="bg-white rounded-md w-full h-auto flex">
          <div className="w-full p-[20px] flex">
            <form className="flex-col gap-3 flex w-full">
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Masukan nama ruangan"
                  type="text"
                  name="name"
                  value={formOld ? formOld.name : formData.name}
                  onChange={handleInputChange}
                  className={`border ${
                    formOld ? "border-blue-500" : ""
                  } text-black text-opacity-60 outline-none rounded-md h-[50px] px-5`}
                />
              </div>
              <button
                className="bg-primary text-white h-[50px] rounded-md"
                onClick={formOld ? handleUpdateRequest : handlePostRequest}
              >
                {loading ? <div className="loader"></div> : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full bg-white mt-5 mb-5">
          <TableEskul setFormOld={setFormOld} data={data} handleGetRequest={handleGetRequest} />
        </div>
      </div>
    </div>
  );
};

export default Ruangan;
