import { useState, useEffect } from 'react';
import { getAllRayon } from '../../../services/rayon.service';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'

const TableEskul = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [size, setSize] = useState('10');
  const [number, setNumber] = useState('1'); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [rayonOptions, setRayonOptions] = useState([]); // Inisialisasi dengan array kosong
  const [getAllData, setGetAllData] = useState(0)

  const DescAndAsc = () =>{
    if(sort === '-id'){
      setSort('')
    }else{
      setSort('-id')
    }
  }

  const pageSizeOptions = [10, 25, 50]; // Add more options as needed

  const handlePageSize = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
  };

  const renderPageSizeOptions = () => {
    return (
      <select
        className="border border-black py-1 rounded-md w-[55px]"
        value={size}
        onChange={handlePageSize}
      >
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  

  const handleGetRequest = async () => {
    try {
      const response = await getAllRayon({ filter, sort, size, number });
      console.log('API Response:', response);

      if (Array.isArray(response.data)) {
        setData(response.data);

        // Extract rayon names without numbers from the response
        const rayonNames = [...new Set(response.data.map((item) => item.name.replace(/\d+/g, '').trim()))];
        setRayonOptions(['', ...rayonNames]); // Tambahkan opsi kosong dan kemudian data dari API'
        setGetAllData(response.data.length);
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

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption);
  };

  useEffect(() => {
    handleGetRequest();
  }, [filter, sort, size, number]);

  if (loading) {
    return (
      <div className='p-3 '>
        <div className='relative bg-transparent flex gap-1 justify-center items-end'>
          <p className='text-animation font-Gabarito text-xl'>Loading</p>
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
      <div className="overflow-x-auto hidden-scroll w-full">
        <table className="min-w-full border-collapse w-full bg-transparent">
          <thead>
            <tr>
              <th className="w-1/6 flex items-center gap-1 px-6 py-3 white text-left text-base leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Rayon
                <button onClick={DescAndAsc}>
                  {sort ? <AiOutlineArrowUp/>: <AiOutlineArrowDown/>}
                </button>
              </th>
                <th></th>
                <th></th> 
              <th className='text-right pr-6'>
              <select
            name=""
            id=""
            className="border border-black py-1 rounded-md w-[85px]"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {rayonOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
              </th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b hover-bg-gray-200">
                  <td className="px-6 py-4 whitespace-no-wrap relative uppercase">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap"></td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {/* Anda dapat menyesuaikan kontennya di sini */}
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
              <div>No Data Available</div>
            )}
          </tbody>
        </table>
          <div className='bg-transparent w-full h-full mt-5 px-5'>
            <div className='bg-transparent flex justify-end items-center gap-4'>
              <div className='flex gap-2 text-white'>
                <button className='text-black'><BiLeftArrow/></button>
              <button className='w-[40px] h-[40px] bg-primary rounded-md'>1</button>
              <button className='w-[40px] h-[40px] bg-primary rounded-md'>2</button>
              <button className='w-[40px] h-[40px] bg-primary rounded-md'>3</button>
              <button className='w-[40px] h-[40px] bg-primary rounded-md'>4</button>
              <button className='w-[40px] h-[40px] bg-primary rounded-md'>5</button>
                <button className='text-black'><BiRightArrow/></button>
              </div>
              <div className='flex items-center gap-2'>
                {renderPageSizeOptions()}
                <p className='text-gray-500 text-xs'>of {getAllData} data</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default TableEskul;
