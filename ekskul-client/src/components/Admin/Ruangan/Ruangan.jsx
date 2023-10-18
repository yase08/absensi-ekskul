// import { useState } from 'react';
// import axios from 'axios';
import TableEskul from './Table';
// import Swal from 'sweetalert2';
import './Ruangan.css'; // Import a CSS file for styling (create this file if not already present)

const Ruangan = () => {


  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">Tingkatan</h1>
        <div className="bg-white rounded-md w-full h-auto flex">
          <div className="w-full p-[20px] flex">
            <form className="flex-col gap-3 flex w-full">
              <div className="flex flex-col gap-2">
                <span className="text-black text-opacity-60 uppercase font-semibold max-md:text-sm">Rombel</span>
                <input
                  placeholder='Input Rombel Here!!'
                  type="text"
                  name='name'
                  // value={rombel.name}
                  // onChange={handleInputChange}
                  className={`border text-black text-opacity-60 outline-none rounded-md h-[50px] px-5`}
                />
              </div>
              <button className="bg-primary text-white h-[50px] rounded-md" >
                {/* {loading ? <div className="loader"></div> : 'Submit'} */}
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="w-full bg-white mt-5 mb-5">
          <TableEskul />
        </div>
      </div>
    </div>
  );
};

export default Ruangan;
