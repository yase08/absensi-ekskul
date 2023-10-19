import { BsInstagram } from "react-icons/bs";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import logo from "../../../assets/Logo-Absensi.png";
import { login } from "../../../services/auth.service";

const Login = () => {
  const [changeMethod, setChangeMethod] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const toggleChangeMethod = () => {
    setChangeMethod(!changeMethod);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      if (response.statusCode === 200) {
        const data = response.data;
        sessionStorage.setItem("token", data);
        navigate('/admin/dashboard')
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-primary flex relative transition-all ">
      <div
        className={` h-full relative duration-[380ms] ${
          changeMethod ? "w-[100%] custom-background " : "w-[800px]"
        }`}
      >
        <div
          className={` w-full h-full px-5 ${
            changeMethod ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          <div className=" w-full bg-transparent h-full flex items-center flex-col justify-center">
            <div
              className={`flex items-center gap-3 text-white mb-5 absolute top-[20px] bg-transparent justify-center ${
                changeMethod ? "hidden" : "left-[20px] "
              }`}
            >
              <img src={logo} alt="" className="w-11" />
              <h1 className="text-xl font-bold font-Gabarito">
                Absensi Wikrama
              </h1>
            </div>
            <h1 className="text-[#FFDE59] text-5xl font-bold font-Gabarito text-center">
              Welcome
            </h1>
            <h1 className="text-[#FEBD59] text- capitalize font-bold font-Gabarito text-center">
              log in to your account
            </h1>
            {/* <button className='w-full bg-white p-4 rounded-sm mt-5 relative'>
                <FcGoogle className='absolute'/>
                <p className='capitalize text-xs font-semibold'>log in with google</p>
              </button> */}
            <div
              className="flex items-center mt-10 mb-7 gap-2 w-full"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="w-full h-[1px] bg-[#FFDE59]" />
              <h1 className="text-[#FFDE59] w-[316px] text-overflow-ellipsis">
                Login With Your Email
              </h1>
              <span className="w-full h-[1px] bg-[#FFDE59]" />
            </div>
            <form
              className="w-full flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex text-white">
                <span className="border-b border-t border-l rounded-l-lg w-[10%] flex items-center justify-center">
                  <AiOutlineUser className="text-2xl" />
                </span>
                <input
                  type="text"
                  placeholder="Input Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="placeholder:text-white w-full h-20 text-xl border-b border-t border-r bg-transparent outline-none p-2 rounded-r-lg"
                />
              </div>
              <div className="flex text-white">
                <span className="border-b border-l border-t rounded-s-lg w-[10%] flex items-center justify-center">
                  <AiOutlineLock className="text-2xl" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Input Your Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`placeholder:text-white w-full h-20 text-xl  bg-transparent outline-none p-2 border-b border-t ${
                    password ? "" : " border-r rounded-r-lg"
                  }`}
                />
                {password && (
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="text-white focus:outline-none w-[10%] flex rounded-r-lg items-center justify-center border-b border-r border-t"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-2xl" />
                    ) : (
                      <AiOutlineEye className="text-2xl" />
                    )}
                  </button>
                )}
              </div>
              <div
                className="flex items-center mb-5 mt-5 gap-2 w-full"
                style={{ whiteSpace: "nowrap" }}
              >
                <span className="w-full h-[1px] bg-[#FFDE59]" />
                <h1 className="text-[#FFDE59] w-[316px] text-overflow-ellipsis">
                  Another Option
                </h1>
                <span className="w-full h-[1px] bg-[#FFDE59]" />
              </div>
              <div className="w-full text-white flex justify-between">
                <button className="capitalize" onClick={toggleChangeMethod}>
                  Not Have Account
                </button>
                <button className="capitalize">forgot password?</button>
              </div>
              <button
                className="w-full h-20 bg-[#FFDE59] text-white font-bold rounded-md polygon"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`bg-transparent h-full text-white duration-[380ms] ${
          changeMethod ? "w-[800px] " : "w-[100%]  custom-background "
        }`}
      >
        <div
          className={` w-full h-full px-5 ${
            changeMethod ? "opacity-100 " : "opacity-0 hidden"
          }`}
        >
          <div className=" w-full bg-transparent h-full flex items-center flex-col justify-center">
            <div
              className={`flex items-center gap-3 text-white mb-5 absolute top-[20px] bg-transparent justify-center ${
                changeMethod ? "hidden" : "left-[20px] "
              }`}
            >
              <img src={logo} alt="" className="w-11" />
              <h1 className="text-xl font-bold font-Gabarito">
                Absensi Wikrama
              </h1>
            </div>
            <h1 className="text-[#FFDE59] text-5xl font-bold font-Gabarito text-center">
              Welcome
            </h1>
            <h1 className="text-[#FEBD59] text- capitalize font-bold font-Gabarito text-center">
              log in to your account
            </h1>
            {/* <button className='w-full bg-white p-4 rounded-sm mt-5 relative'>
                <FcGoogle className='absolute'/>
                <p className='capitalize text-xs font-semibold'>log in with google</p>
              </button> */}
            <div
              className="flex items-center mt-10 mb-7 gap-2 w-full"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="w-full h-[1px] bg-[#FFDE59]" />
              <h1 className="text-[#FFDE59] w-[316px] text-overflow-ellipsis">
                Login With Your Email
              </h1>
              <span className="w-full h-[1px] bg-[#FFDE59]" />
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex text-white">
                <span className="border-b border-t border-l rounded-l-lg w-[10%] flex items-center justify-center">
                  <AiOutlineUser className="text-2xl" />
                </span>
                <input
                  type="text"
                  placeholder="Input Your Email"
                  className="placeholder:text-white w-full h-20 text-xl border-b border-t border-r bg-transparent outline-none p-2 rounded-r-lg"
                />
              </div>
              <div className="flex text-white">
                <span className="border-b border-l border-t rounded-s-lg w-[10%] flex items-center justify-center">
                  <AiOutlineLock className="text-2xl" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Input Your Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`placeholder:text-white w-full h-20 text-xl  bg-transparent outline-none p-2 border-b border-t ${
                    password ? "" : " border-r rounded-r-lg"
                  }`}
                />
                {password && (
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="text-white focus:outline-none w-[10%] flex rounded-r-lg items-center justify-center border-b border-r border-t"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-2xl" />
                    ) : (
                      <AiOutlineEye className="text-2xl" />
                    )}
                  </button>
                )}
              </div>
              <div
                className="flex items-center mb-5 mt-5 gap-2 w-full"
                style={{ whiteSpace: "nowrap" }}
              >
                <span className="w-full h-[1px] bg-[#FFDE59]" />
                <h1 className="text-[#FFDE59] w-[316px] text-overflow-ellipsis">
                  Another Option
                </h1>
                <span className="w-full h-[1px] bg-[#FFDE59]" />
              </div>
              <div className="w-full text-white flex justify-between">
                <button className="capitalize" onClick={toggleChangeMethod}>
                  Not Have Account
                </button>
                <button className="capitalize">forgot password?</button>
              </div>
              <button className="w-full h-20 bg-[#FFDE59] text-white font-bold rounded-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
