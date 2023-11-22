import { useState, useEffect } from "react";
import { deleteRayon, getAllRayon } from "../../../services/rayon.service";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useDebouncedCallback } from "use-debounce";
import Swal from "sweetalert2";

const TableEskul = ({ setFormOld }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("10");
  const [number, setNumber] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getAllData, setGetAllData] = useState(0);
  // const [rayonOptions, setRayonOptions] = useState([]);

  const ToggleHandleSearch = () => {
    setSearch(!search);
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setFilter(value);
      console.log(value);
    },
    // delay in ms
    1500
  );

  // const handleInputChange = (e) => {
  //   setFilter(e.target.value);
  // };

  const totalPages = Math.ceil(getAllData / size); // Calculate total pages

  const handlePrevPage = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const handleNextPage = () => {
    if (number < totalPages) {
      setNumber(number + 1);
    }
  };

  const generatePaginationButtons = () => {
    const paginationButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`w-[40px] h-[40px] bg-primary rounded-md ${
            i === number ? "bg-blue-600" : "hover:bg-blue-400"
          }`}
          onClick={() => setNumber(i)}
        >
          {i}
        </button>
      );
    }

    return paginationButtons;
  };

  const DescAndAsc = () => {
    setSort(sort === "-id" ? "" : "-id");
  };

  const pageSizeOptions = [10, 25, 50];

  const handlePageSize = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
    // Reset the current page to the first page when changing page size
    setNumber(1);
  };

  const handleGetRequest = async () => {
    try {
      const response = await getAllRayon({ filter, sort, size, number });

      if (response && response.data) {
        console.log("API Response:", response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rayonData = response.data;
          setData(rayonData);

          // Filter the rayon options based on your criteria
          // Set the total data count
          setGetAllData(response.option);
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

  const handleDeleteRequest = async (id) => {
    // event.preventDefault();
    setLoading(true);

    try {
      const response = await deleteRayon(id);
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });

      handleGetRequest();
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

  // setRayonOptions(['', ...data.map((item) => item.name)]);
  useEffect(() => {
    handleGetRequest();
  }, [filter, sort, size, number]);

  if (loading) {
    return (
      <div className="p-3">
        <div className="relative bg-transparent flex gap-1 justify-center items-end">
          <p className="text-animation font-Gabarito text-xl">Loading</p>
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
      <div className="overflow-x-auto hidden-scroll w-full">
        <table className="min-w-full border-collapse w-full bg-transparent">
          <thead>
            <tr>
            <th className="px-6 py-3 flex text-left text-base leading-4 text-gray-600 uppercase tracking-wider">
                No
                <button onClick={DescAndAsc}>
                  {sort ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 text-gray-600 uppercase tracking-wider">
                Rayon
              </th>
              <th className="text-right bg-transparent">
                <input
                  type="text"
                  placeholder="Search Here..."
                  className={`bg-transparent border-b border-black outline-none relative transition-all duration-500 ${
                    search ? "w-[150px]" : "w-0"
                  }`}
                  // value={}
                  onChange={(e) => debounced(e.target.value)}
                />
                <button
                  className={`mx-3 p-2 border rounded-full border-black hover:bg-black hover:text-white 
                  }`}
                  onClick={ToggleHandleSearch}
                >
                  <AiOutlineSearch />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-no-wrap relative uppercase">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap relative uppercase">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => setFormOld(item)}
                    >
                      Edit
                    </button>
                    <span className="px-2">|</span>
                    <button
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                      onClick={() => handleDeleteRequest(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="bg-transparent w-full h-full mt-5 px-5">
          <div className="bg-transparent flex justify-end items-center gap-4">
            <div className="flex gap-2 text-white">
              <button className="text-black" onClick={handlePrevPage}>
                <BiLeftArrow />
              </button>
              {totalPages >= 1 && generatePaginationButtons()}
              <button className="text-black" onClick={handleNextPage}>
                <BiRightArrow />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="border border-black py-1 rounded-md w-[55px]"
                value={size}
                onChange={handlePageSize}
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className="text-gray-500 text-xs">
                Page {number} of {totalPages} | Total data: {getAllData}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableEskul;
