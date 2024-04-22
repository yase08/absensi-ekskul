import React from "react";
import { BiHeart, BiLocationPlus, BiLockOpen } from "react-icons/bi";
import { Bs2CircleFill, BsFillHeartFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationArrow, FaLocationPin } from "react-icons/fa6";
import { GiLoveLetter } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import logo from "../../../assets/logoeskul.png";
import { Link } from "react-router-dom";

const TopLay = () => {
  return (
    <div className="bg-transparent w-full  h-auto grid grid-cols-1 ">
      <div className="bg-[#3F85EC] w-full py-[10px] px-[15px] flex justify-center ">
        <div className="max-w-[1000px] bg-transparent w-full flex justify-between">
          <div className="flex items-center gap-[15px] text-white text-[15px]">
            <div className="flex items-center gap-[5px] group">
              <FaLocationArrow />
              <p className="capitalize truncate w-64 overflow-hidden group-hover:w-full">
                Jl. Raya Wangun, RT.01/RW.06, Sindangsari, Kec. Bogor Tim., Kota
                Bogor, Jawa Barat 16146
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <MdEmail />
              <p>prohumasi@smkwikrama.sch.id</p>
            </div>
          </div>
          <Link
            to="/login"
            className="flex gap-[5px] text-white items-center text-[15px]"
          >
            <BiLockOpen />
            <button className="capitalize">login</button>
          </Link>
        </div>
      </div>
      <div className="w-full py-[10px] border-b border-black border-opacity-20 bg-white px-[15px] flex justify-center">
        <div className="max-w-[1000px] bg-transparent w-full flex justify-between">
          <div className="flex items-center gap-[5px]">
            <img src={logo} alt="" className="w-[20px] mr-1" />
            <p className="text-[22px] capitalize font-normal">
              Ekstrakurikuler
            </p>
          </div>
          <div className="flex gap-[30px] items-center">
            <div className="flex items-center gap-[10px]">
              <RiCustomerService2Fill className="text-[18px]" />
              <div>
                <p className="text-[14px] font-light capitalize">
                  need any help?
                </p>
                <p className="text-[14px] font-semibold">(0251) 8242411</p>
              </div>
            </div>
            <a
              className="p-[5px] capitalize text-[12px] rounded-sm text-white bg-blue-500"
              href="mailto:prohumasi@smkwikrama.sch.id"
            >
              email now
            </a>
          </div>
        </div>
      </div>
      <div className="w-full py-[10px] bg-white px-[15px] flex justify-center">
        <div className="max-w-[1000px] bg-transparent w-full flex justify-between">
          <ul className="flex gap-[10px] uppercase text-[14px] font-semibold">
            <li>
              <Link
                to="/"
                className="hover:text-blue-500 transition duration-300 ease-in-out"
              >
                home
              </Link>
            </li>
            {/* <li>
              <Link
                to="/gallery"
                className="hover:text-blue-500 transition duration-300 ease-in-out"
              >
                gallery
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopLay;
