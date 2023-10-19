import { useState } from 'react';
import TableEskul from './Table';
import Swal from 'sweetalert2';
import './Rayon.css'; 
import { createRayon } from '../../../services/rayon.service';

const Rayon = () => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostRequest = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await createRayon({
        name: formData.name
      })
      const successMessage = response;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successMessage,
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error,
      });
      if (error.statusMessage) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.statusMessage,
        });
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">Tingkatan</h1>
        <div className="bg-white rounded-md w-full h-auto flex">
          <div className="w-full p-[20px] flex">
            <form className="flex-col gap-3 flex w-full">
              <div className="flex flex-col gap-2">
                <span className="text-black text-opacity-60 uppercase font-semibold max-md:text-sm">Rayon</span>
                <input
                  placeholder='Input Rayon Here!!'
                  type="text"
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`border text-black text-opacity-60 outline-none rounded-md h-[50px] px-5`}
                />
              </div>
              <button className="bg-primary text-white h-[50px] rounded-md" onClick={handlePostRequest}>
                {loading ? <div className="loader"></div> : 'Submit'}
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

export default Rayon;
