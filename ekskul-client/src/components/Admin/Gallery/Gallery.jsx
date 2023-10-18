import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Gallery = () => {
  const [formData, setFormData] = useState({
    name: '',
    images: null,
    date: '',
    ekskul_id: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files[0],
    });
  };

  const validateForm = () => {
    // Implement your validation logic here
    return true;
  };

  const postdata = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('name', formData.name);
      formDataForUpload.append('images', formData.images);
      formDataForUpload.append('date', formData.date);
      formDataForUpload.append('ekskul_id', formData.ekskul_id);

      const response = await axios.post('https://cxw30mfb-8000.asse.devtunnels.ms/api/v1/gallery', formDataForUpload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
      const successMessage = response.data.statusMessage;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successMessage,
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);

      let errorMessage = 'An unexpected error occurred.';
      if (error.response) {
        errorMessage = error.response.data.statusMessage;
      } else if (error.request) {
        errorMessage = 'No response received from the server.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={postdata}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <input type="file" name="images" onChange={handleFileChange} />
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
        <input type="number" name="ekskul_id" value={formData.ekskul_id} onChange={handleInputChange} />
        <button className="bg-primary text-white h-[50px] rounded-md" type="submit">
          {loading ? <div className="loader"></div> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Gallery;
