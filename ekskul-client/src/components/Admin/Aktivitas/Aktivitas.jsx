import Table from './Table'
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { IoAddSharp } from 'react-icons/io5';

const AktivitasComponent = () => {
  const axiosPrivate = useAxiosPrivate()
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    activity: '',
    task: '',
    startDate: '',
    endDate: ''
  });
  const [formOld, setFormOld] = useState({});
  // const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

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

  const handlePostRequest = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await  axiosPrivate.post('/activity-program', formData);
      console.log(formData);
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
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
      const response = await axiosPrivate.put(`/activity-program/${formOld.id}`, formOld);
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


  return (
    <div className="w-full h-full bg-transparent p-[20px]">
    <div className="w-full flex flex-col gap-2">
      <div className='flex justify-between'>
      <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">AktivitasComponent Siswa</h1>
      <button onClick={toggleExpansion} className='bg-blue-500 p-2 text-white rounded-md hover:bg-yellow-500'><IoAddSharp size={20} /></button>
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
        <label htmlFor="" className='text-xl'>Aktivitas</label>
        <input value={formOld ? formOld.activity : formData.activity} onChange={handleInputChange} type="text" name="activity" id="" placeholder="Input Your Activity" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Tugas</label>
        <input value={formOld ? formOld.task : formData.task} onChange={handleInputChange} type="text" name="task" id="" placeholder="Input Your Task" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Tanggal Mulai</label>
        <input value={formOld ? formOld.startDate : formData.startDate} onChange={handleInputChange} type="date" name="startDate" id="" placeholder="" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <label htmlFor="" className='text-xl'>Tanggal Akhir</label>
        <input value={formOld ? formOld.endDate : formData.endDate} onChange={handleInputChange} type="date" name="endDate" id="" placeholder="" className='bg-transparent outline-none border p-3 rounded-md border-gray-400'/>
        <button className='bg-blue-500 p-2 mt-4 rounded-md text-white' onClick={formOld ? handleUpdateRequest : handlePostRequest}>Submit</button>
      </form>
     </div>
   </div>
 </div>

    )}
  </div>
  )
}

export default AktivitasComponent