import Table from './Table'
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { createStudent, updateStudent } from '../../../services/student.service';
import { getAllRombel } from '../../../services/rombel.service';
import { getAllRayon } from '../../../services/rayon.service';
import { getAllEkskul } from '../../../services/ekskul.service';

const Siswa = () => {
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nis: '',
    email: '',
    mobileNumber: '',
    rombel_id:'',
    rayon_id:'',
    ekskuls: []
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

    if (name === 'ekskul_id') {
      // Get the index from the name attribute (ekskul_id_0, ekskul_id_1, etc.)
      const index = Number(name.split('_')[2]);
  
      setFormData({
        ...formData,
        ekskuls: formData.ekskuls.map((item, i) =>
          i === index ? Number(value) : item
        ),
      });
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
  }

  const handleGetRombelRequest = async () => {
    try {
      const response = await getAllRombel({ filter: '', number: '', size: '', sort: '' });

      if (response && response.data) {
        console.log('API Response:', response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rombelData = response.data;
          setRombel(rombelData);

          // Filter the rayon options based on your criteria
          // Set the total data count
        } else {
          console.log('Data is not an array');
        }
      } else {
        console.log('Data retrieval failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRayonRequest = async () => {
    try {
      const response = await getAllRayon({ filter: '', number: '', size: '', sort: '' });

      if (response && response.data) {
        console.log('API Response:', response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const rayonData = response.data;
          setRayon(rayonData);

          // Filter the rayon options based on your criteria
          // Set the total data count
        } else {
          console.log('Data is not an array');
        }
      } else {
        console.log('Data retrieval failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetEkskulRequest = async () => {
    try {
      const response = await getAllEkskul({ filter: '', number: '', size: '', sort: '' });

      if (response && response.data) {
        console.log('API Response:', response.data);
        console.log(response);

        if (Array.isArray(response.data)) {
          const ekskulData = response.data;
          setEkskul(ekskulData);

          // Filter the rayon options based on your criteria
          // Set the total data count
        } else {
          console.log('Data is not an array');
        }
      } else {
        console.log('Data retrieval failed');
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
      const response = await createStudent({ 
         ...formData,
        rombel_id: Number(formData.rombel_id),
        rayon_id: Number(formData.rayon_id)
      });

      console.log(formData);
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: 'success',
        title: 'Success ww!',
        text: successMessage,
      });
      setOpen(!isOpen)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        const errorMessage = error.response.data.statusMessage;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
        });
      } else if (error.request) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No response received from the server.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An unexpected error occurred.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest  = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formOld);

    try {
      const response = await updateStudent(formOld.id, formOld);
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successMessage,
      });
      setFormOld('')
      setOpen(!isOpen)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        const errorMessage = error.response.statusMessage;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
        });
      } else if (error.request) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No response received from the server.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An unexpected error occurred.',
        });
      }
    } finally {
      setLoading(false);
    }
  }
  
  const toggleExpansion = () => {
    setOpen(!isOpen);
    if (formOld) {  
      setFormOld('')
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
      <div className='flex justify-between'>
      <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">Program</h1>
      <button onClick={toggleExpansion} className='bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500'>Add Data</button>
      </div>
      <div className="w-full bg-white mt-3 mb-5">
        <Table setFormOld={setFormOld} setOpen={setOpen} />
      </div>
    </div>
    {isOpen && (
   <div className='bg-transparent flex items-center justify-center w-full absolute top-0 left-0 h-full z-50' style={{ backdropFilter: 'blur(5px)' }}>
   <div className='bg-light w-[600px] h-auto border shadow-md'>
     <div className='flex justify-between p-5 border-b border-gray-300  relative group'>
       <p className='font-semibold opacity-70'> {formOld ? 'Edit Data Program' : 'Add Data Program'}</p>
       <button onClick={toggleExpansion}>
         <AiOutlineClose className='text-2xl'/>
       </button>
     </div>
     <div className='w-full h-full'>
      <form action="" className='flex flex-col p-5 gap-2'>
        <label htmlFor="" className='text-xl'>Name</label>
        <input value={formOld ? formOld.name : formData.name} onChange={handleInputChange} type="text" name="name" id="" placeholder="Input Your Name" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>NIS</label>
        <input value={formOld ? formOld.nis : formData.nis} onChange={handleInputChange} type="number" name="nis" id="" placeholder="Input Your nis" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Email</label>
        <input value={formOld ? formOld.email : formData.email} onChange={handleInputChange} type="email" name="email" id="" placeholder="Input your email" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Number</label>
        <input value={formOld ? formOld.mobileNumber : formData.mobileNumber} onChange={handleInputChange} type="number" name="mobileNumber" id="" placeholder="Input your number" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <div className="flex gap-5">
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="" className='text-xl'>Rombel</label>
          <select name='rombel_id' value={formOld ? formOld.rombel.id : formData.rombel_id} className='w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40' onChange={handleInputChange}>
            <option selected disabled value="">Select Rombel</option>
            {
              rombel.map((item, index) => {
                return (
                  <option key={index} value={Number(item.id)}>{item.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className='flex gap-2 flex-col w-full'>
          <label htmlFor="" className='text-xl'>Rayon</label>
          <select name='rayon_id' value={formOld ? formOld.rayon.id : formData.rayon_id} className='w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40' onChange={handleInputChange}>
            <option selected disabled value="">Select Rayon</option>
            {
              rayon.map((item, index) => {
                return (
                  <option key={index} value={Number(item.id)}>{item.name}</option>
                )
              })
            }
          </select>
          </div>
        </div>
        <label htmlFor="" className='text-xl'>Ekskul</label>
        <div className="flex gap-5">
          <select name={`ekskul_id_${0}`} value={formOld ? formOld.ekskuls[0] : formData.ekskuls[0]} className='w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40' onChange={handleInputChange}>
            <option selected disabled value="">Select Ekskul</option>
            {
              ekskul.map((item, index) => {
                return (
                  <option key={index} value={Number(item.id)}>{item.name}</option>
                )
              })
            }
          </select>
          <select name={`ekskul_id_${1}`} value={formOld ? formOld.ekskuls[1] : formData.ekskuls[1]} className='w-full bg-transparent outline-none border p-3 rounded-md border-gray-400 text-opacity-40' onChange={handleInputChange}>
            <option selected disabled value="">Select Ekskul</option>
            {
              ekskul.map((item, index) => {
                return (
                  <option key={index} value={Number(item.id)}>{item.name}</option>
                )
              })
            }
          </select>
        </div>
        <button className='bg-blue-500 p-2 mt-4 rounded-md text-white' onClick={formOld ? handleUpdateRequest : handlePostRequest}>Submit</button>
      </form>
     </div>
   </div>
 </div>

    )}
  </div>
  )
}

export default Siswa