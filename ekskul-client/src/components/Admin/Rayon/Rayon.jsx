import { useEffect, useState } from "react";
import TableEskul from "./Table";
import Swal from "sweetalert2";
import "./Rayon.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Rayon = () => {
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [formOld, setFormOld] = useState("");
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
      const response = await axiosPrivate.get(`/rayon`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const rayonData = response.data.data;
          setData(rayonData);
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
      const response = await axiosPrivate.post(`/rayon`, formData);
      const successMessage = response.data.statusMessage;
      handleGetRequest()

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: successMessage,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error,
      });
      if (error.statusMessage) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.statusMessage,
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
      const response = await axiosPrivate.put(`/rayon/${formOld.id}`, formOld);
      const successMessage = response.data.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: successMessage,
      });
      setFormOld("");
      handleGetRequest()
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
    }
  };

  useEffect(() => {
    handleGetRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
          Tingkatan
        </h1>
        <div className="bg-white rounded-md w-full h-auto flex">
          <div className="w-full p-[20px] flex">
            <form className="flex-col gap-3 flex w-full">
              <div className="flex flex-col gap-2">
                <span className="text-black text-opacity-60 uppercase font-semibold max-md:text-sm">
                  Rayon
                </span>
                <input
                  placeholder="Masukan nama rayon"
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

export default Rayon;
