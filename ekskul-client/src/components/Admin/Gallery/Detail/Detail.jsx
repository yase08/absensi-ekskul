import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { FaRegTrashAlt } from "react-icons/fa";

const DetailGallery = ({ setFormOld, setOpen }) => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const handleGetRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/gallery/detail/${slug}`);

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const galleryData = response.data.data;
          setData(galleryData);
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

  const handleDeleteRequest = async (id, imageName) => {
    setLoading(true);

    try {
      const response = await axiosPrivate.delete(`/gallery/image/${id}`, {
        data: { imageName: imageName },
      });
      const successMessage = response.data.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });

      handleGetRequest();
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

  useEffect(() => {
    handleGetRequest();
  }, []);

  return (
    <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
      <div className="w-full flex flex-col gap-2 pb-5">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Detail Galeri {slug}
          </h1>
        </div>
      </div>
      <div className="gap-5 w-full ">
        {data.map((item, index) => {
          const imageArray = JSON.parse(item.images);
          return (
            <div
              className="w-full rounded-lg grid grid-cols-2 max-md:grid-cols-1 gap-5"
              key={index}
            >
              {imageArray.map((imageName, imageIndex) => (
                <div className="flex flex-col px-5 py-3 rounded-lg">
                  <img
                    key={imageIndex}
                    className="w-full"
                    src={`http://localhost:8000/images/${imageName}`}
                    alt={imageName}
                  />
                  <button
                    className="w-full flex justify-center items-center bg-red-600 hover:bg-red-500 py-3"
                    onClick={() => handleDeleteRequest(item.id, imageName)}
                  >
                    <FaRegTrashAlt className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailGallery;
