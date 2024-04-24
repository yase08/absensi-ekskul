import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const DetailGalleryComponent = () => {
  const axiosPrivate = useAxiosPrivate();
  const { slug } = useParams();
  const [gallery, setGallery] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axiosPrivate.get(`/gallery/detail/images/${slug}`);
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
        <div className="w-full h-auto bg-transparent flex justify-between gap-[5px]">
          <p className="text-[25px] font-bold uppercase text-center text-black">
            {gallery.name}
          </p>
          <p className="text-[25px] font-bold uppercase text-center text-black">
            {dayjs(gallery.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>
        <div className="grid grid-cols-1 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-[2%] mx-1">
          {gallery?.images &&
            gallery.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8000/images/${image}`}
                  alt=""
                  className="rounded-md w-full h-full"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailGalleryComponent;
