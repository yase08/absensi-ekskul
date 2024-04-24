import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Jumbo = () => {
  const axiosPrivate = useAxiosPrivate();
  const [gallery, setGallery] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axiosPrivate.get(`/gallery/single`);
      setGallery(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="w-full bg-transparent px-[10px] h-auto flex items-center justify-center mt-[20px]">
      <div className="max-w-[1000px] bg-transparent  flex flex-col gap-[20px] w-full h-full">
        <div className="w-full h-auto bg-transparent flex items-start flex-col justify-start gap-[5px]">
          <p className="text-[25px] font-bold uppercase text-center text-black">
            gallery
          </p>
        </div>
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-[2%] mx-1">
          {gallery.map((item) => (
            <Link to={`/gallery/${item.slug}`}>
              <div className="relative">
                <img
                  src={`http://localhost:8000/images/${item.images[0]}`}
                  alt=""
                  className="rounded-md w-full h-full"
                />
                <div className="w-full text-black rounded-md flex items-center justify-between absolute">
                  <p className="text-xl capitalize font-medium">{item.name}</p>
                  <p className="text-base capitalize font-medium">
                    {dayjs(item.createdAt).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jumbo;
