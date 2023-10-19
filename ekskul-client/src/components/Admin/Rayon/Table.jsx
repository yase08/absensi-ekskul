import { useState, useEffect } from 'react';
import { getAllRayon } from '../../../services/rayon.service';

const TableEskul = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [size, setSize] = useState('');
  const [number, setNumber] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const handleGetRequest = async () => {
    try {
      const response = await getAllRayon({ filter, sort, size, number });
      console.log('API Response:', response);

      if (Array.isArray(response.data)) { 
        setData(response.data);
      } else {
        setError(new Error('Data is not an array'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleGetRequest();
  }, [filter, sort, size, number]);

  if (loading) {
    return <div className='p-3 '>
      <div className='relative bg-transparent flex gap-1 justify-center items-end'>
      <p className='text-animation font-Gabarito text-xl'>Loading</p>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
      </div>
      </div>;
  }

  if (error) {
    return <p></p>;
  }

  return (
    <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
      <div className="overflow-x-auto hidden-scroll w-full">
        <table className="min-w-full border-collapse w-full">
          <thead>
            <tr>
              <th className="w-1/6 px-6 py-3 white text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Rayon
              </th>
            </tr>
            <tr>
              <th className="w-1/6 px-6 py-3 white text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Rayon
              </th>
              <td className="px-6 py-4 whitespace-no-wrap"></td>
              <td className="px-6 py-4 whitespace-no-wrap"></td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm outline-none  bg-transparent pr-6 leading-5 font-medium">
                <select name="" id="" className='border border-black py-1 rounded-md w-[85px]'>
                  <option value="" selected>Selected</option>
                  <option value="">asu</option>
                  <option value="">asu</option>
                </select>
              </td>
            </tr>
          </thead>
          <tbody>
          {
            data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b hover-bg-gray-200">
                  <td className="px-6 py-4 whitespace-no-wrap relative uppercase">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap"></td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {/* You can customize the content here */}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <a href="#" className="text-indigo-600 hover-text-indigo-900">
                      Edit
                    </a>
                    <span className="px-2">|</span>
                    <button className="text-red-600 hover-text-red-900 cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>hello</div>
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEskul;
