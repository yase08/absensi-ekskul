import React from "react";
import Swal from "sweetalert2";
import axios from "../../utils/config";
import { useParams } from "react-router-dom";

function ResetToken() {
  const { token } = useParams();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const data = { password: e.target.password.value };
    const response = await axios.post(`/auth/reset-token/${token}`, data);
    if (response.data.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.statusMessage,
      });
    }
  };
  return (
    <div className="flex min-h-screen text-xl items-center justify-center bg-primary">
      <div className="w-full max-w-xl border-slate-700 py-5 px-5">
        <div className="w-4/5">
          <h1 className="text-3xl text-slate-200 font-bold mb-2 text-left">
            Change your password 🔐
          </h1>
          <h2 className="text-lg text-slate-300 mb-5">
            Enter your new password
          </h2>
        </div>
        <form onSubmit={handleChangePassword}>
          <div className="pb-5">
            <label htmlFor="" className={`text-base font-medium text-white`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 text-slate-300 border-slate-500 rounded-md border my-2 text-base outline-none focus:border-[#a69fdb] bg-transparent"
            />
          </div>
          <div className="w-full flex justify-between gap-5">
            <button
              size="w-20"
              className={`bg-[#FFDE59] text-white px-4 py-2 text-lg rounded-md w-full hover:bg-[#e7c952]`}
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetToken;
