import Table from "./Table";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import {
  createStudent,
  updateStudent,
} from "../../../services/student.service";
import { getAllRombel } from "../../../services/rombel.service";
import { getAllRayon } from "../../../services/rayon.service";
import { getAllEkskul } from "../../../services/ekskul.service";

const Siswa = () => {
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nis: "",
    email: "",
    mobileNumber: "",
    rombel: {
      id: "",
      name: "",
    },
    rayon: {
      id: "",
      name: "",
    },
    ekskuls: [{
      id: "",
      name: ""
    },
    {
      id: "",
      name: ""
    }
    ],
    gender: ""
  });
  const [formOld, setFormOld] = useState({});
  const [rombel, setRombel] = useState({});
  const [rayon, setRayon] = useState({});
  const [ekskul, setEkskul] = useState({});
  // const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(formOld);

    if (name.startsWith("ekskul_id")) {     
      const index = name.substring(name.lastIndexOf("_") + 1);
      if (formOld) {
        const updatedEkskulsOld = [...formOld.ekskuls]; // Make a copy of ekskuls array
        updatedEkskulsOld[index] = value;
        setFormOld({
          ...formOld,
          ekskuls: updatedEkskulsOld,
        });
      } else {
        const updatedEkskuls = [...formData.ekskuls]; // Make a copy of ekskuls array
        updatedEkskuls[index] = value;
        setFormData({
          ...formData,
          ekskuls: updatedEkskuls,
        });
      }

     } else if (name === "rombel" || name === "rayon") {
      if (formOld) {
        setFormOld({
          ...formOld,
          [name]: {
            id: value,
            name: ''
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: {
            id: value,
            name: '', 
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
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rombelData = response.data;
          setRombel(rombelData);

          // Filter the rayon options based on your criteria
          // Set the total data count
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
      const response = await getAllRayon({
        filter: "",
        number: "",
        size: "",
        sort: "",
      });

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rayonData = response.data;
          setRayon(rayonData);

          // Filter the rayon options based on your criteria
          // Set the total data count
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
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const ekskulData = response.data;
          setEkskul(ekskulData);

          // Filter the rayon options based on your criteria
          // Set the total data count
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
      const response = await createStudent({
        ...otherFormData, 
        rombel_id: rombel, 
        rayon_id: rayon, 
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
        name: "",
        nis: "",
        email: "",
        mobileNumber: "",
        rombel_id: "",
        rayon_id: "",
        ekskuls: [],
        gender: ""
      })
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
      const response = await updateStudent(formOld.id, {...formOld, rayon_id: formOld.rayon.id, rombel_id: formOld.rombel.id});
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });
      setFormOld("");
      setOpen(!isOpen);
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

  const toggleExpansion = () => {
    setOpen(!isOpen);
    if (formOld) {
      setFormOld("");
    }
  };

  useEffect(() => {
    handleGetRombelRequest();
    handleGetRayonRequest();
    handleGetEkskulRequest();
  }, []);

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Siswa
          </h1>
          <button
            onClick={toggleExpansion}
            className="bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500"
          >
            Add Data
          </button>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table setFormOld={setFormOld} setOpen={setOpen} />
        </div>
      </div>
      {isOpen && (
        <div
          className="bg-transparent flex items-center justify-center w-full absolute top-0 left-0 h-full z-50"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="bg-light w-[600px] h-auto border shadow-md">
            <div className="flex justify-between p-5 border-b border-gray-300  relative group">
              <p className="font-semibold opacity-70">
                {" "}
                {formOld ? "Edit Data Siswa" : "Add Data Siswa"}
              </p>
              <button onClick={toggleExpansion}>
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>
            <div className="w-full h-full">
              <form action="" className="flex flex-col p-5 gap-2">
                <label htmlFor="" className="text-xl">
                  Name
                </label>
                <input
                  value={formOld ? formOld.name : formData.name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id=""
                  placeholder="Input Your Name"
                  className="bg-transparent outline-none border p-3 rounded-md border-gray-400"
                />
                <label htmlFor="" className="text-xl">
                  NIS
                </label>
                <input
                  value={formOld ? formOld.nis : formData.nis}
                  onChange={handleInputChange}
                  type="number"
                  name="nis"
                  id=""
                  placeholder="Input Your nis"
                  className="bg-transparent outline-none border p-3 rounded-md border-gray-400"
                />
                <label htmlFor="" className="text-xl">
                  Email
                </label>
                <input
                  value={formOld ? formOld.email : formData.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id=""
                  placeholder="Input your email"
                  className="bg-transparent outline-none border p-3 rounded-md border-gray-400"
                />
                <label htmlFor="" className="text-xl">
                  Number
                </label>
                <input
                  value={formOld ? formOld.mobileNumber : formData.mobileNumber}
                  onChange={handleInputChange}
                  type="number"
                  name="mobileNumber"
                  id=""
                  placeholder="Input your number"
                  className="bg-transparent outline-none border p-3 rounded-md border-gray-400"
                />
                <label htmlFor="" className="text-xl">
                  Gender
                </label>
                <select
                      name="gender"
                      value={formOld ? formOld.gender : formData.gender}
                      className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                      onChange={handleInputChange}
                    >
                      <option selected disabled value="">
                        Pilih Gender
                      </option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                <div className="flex gap-5">
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
                        Select Rombel
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
                  <div className="flex gap-2 flex-col w-full">
                    <label htmlFor="" className="text-xl">
                      Rayon
                    </label>
                    <select
                      name="rayon"
                      value={formOld ? formOld.rayon.id : formData.rayon.id}
                      className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                      onChange={handleInputChange}
                    >
                      <option selected disabled value="">
                        Select Rayon
                      </option>
                      {rayon.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <label htmlFor="" className="text-xl">
                  Ekskul
                </label>
                <div className="flex gap-5">
                  <select
                    name={`ekskul_id_${0}`}
                    value={formOld ? formOld.ekskuls[0].id : formData.ekskuls[0].id}
                    className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                    onChange={handleInputChange}
                  >
                    <option selected disabled value="">
                      Select Ekskul
                    </option>
                    {ekskul.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name={`ekskul_id_${1}`}
                    value={formOld ? formOld.ekskuls[1].id : formData.ekskuls[1].id}
                    className="w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40"
                    onChange={handleInputChange}
                  >
                    <option selected disabled value="">
                      Select Ekskul
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

export default Siswa;
