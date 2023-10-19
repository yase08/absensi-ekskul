import  { useState } from 'react'
import { getAllRayon } from '../../../services/rayon.service';
import { useEffect } from 'react';

const TableEskul = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [size, setSize] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState('')

  const handleGetRequest = async () => {
    try {
      const response = await getAllRayon({
        filter,sort,size,number
      })
      
      console.log(setData)
    } catch (error) {
      console.error('Error:', error);
      }
 
    };

    useEffect(() => {
      handleGetRequest();
    });
  return (
    <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
    <div className="overflow-x-auto hidden-scroll w-full">
        {/* <div>
          <span className='w-full flex items-center justify-center'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                className='w-[100px] h-[100px] opacity-60'
                viewBox="0 0 500 625"
                enableBackground="new 0 0 500 500"
                xmlSpace="preserve">
                <g>
                    <g>
                        <g><path
                            d="M460.8,115.9c0,36.2,0,72.3,0,108.5c0,57.7,0,115.3,0,173c0,13.3,0,26.5,0,39.8c3.3-3.3,6.7-6.7,10-10     c-14.7,0-29.3,0-44,0c-35.2,0-70.4,0-105.5,0c-42.4,0-84.8,0-127.2,0c-36.8,0-73.6,0-110.4,0c-12.1,0-24.2,0-36.3,0     c-5.7,0-11.7-0.5-17.4,0c-0.2,0-0.5,0-0.8,0c3.3,3.3,6.7,6.7,10,10c0-12.4,0-24.9,0-37.3c0-29.9,0-59.8,0-89.7     c0-36,0-71.9,0-107.9c0-31.3,0-62.5,0-93.8c0-10.3,0-20.6,0-30.9c0-4.8,0.4-9.9,0-14.7c0-0.2,0-0.4,0-0.6c-3.3,3.3-6.7,6.7-10,10     c37.9,0,75.7,0,113.6,0c5.4,0,10.8,0,16.1,0c-2.4-1-4.7-2-7.1-2.9c19.1,15.3,38.2,30.5,57.4,45.8c5.1,4.1,11.1,10.5,17.9,10.7     c6,0.2,12.1,0,18.1,0c57.9,0,115.7,0,173.6,0c17.3,0,34.6,0,51.9,0c12.9,0,12.9-20,0-20c-27.5,0-55,0-82.5,0c-44,0-88,0-132,0     c-10,0-20.1,0-30.1,0c2.4,1,4.7,2,7.1,2.9c-22.4-17.8-44.6-35.8-67.1-53.5c-4.5-3.5-8.9-3-14.1-3c-7.3,0-14.6,0-21.9,0     c-20.3,0-40.6,0-60.9,0c-13.3,0-26.7,0-40,0c-5.4,0-10,4.6-10,10c0,12.4,0,24.9,0,37.3c0,29.9,0,59.8,0,89.7c0,36,0,71.9,0,107.9     c0,31.3,0,62.5,0,93.8c0,15.1-0.6,30.4,0,45.6c0,0.2,0,0.4,0,0.6c0,5.4,4.6,10,10,10c14.7,0,29.3,0,44,0c35.2,0,70.4,0,105.5,0     c42.4,0,84.8,0,127.2,0c36.8,0,73.6,0,110.4,0c17.9,0,35.9,0.7,53.7,0c0.3,0,0.5,0,0.8,0c5.4,0,10-4.6,10-10     c0-36.2,0-72.3,0-108.5c0-57.7,0-115.3,0-173c0-13.3,0-26.5,0-39.8C480.8,103,460.8,103,460.8,115.9z"/></g>
                    </g>
                    <g>
                        <g><path
                            d="M30,206.8c14.6,0,29.2,0,43.9,0c35.1,0,70.2,0,105.3,0c42.3,0,84.5,0,126.8,0c36.6,0,73.1,0,109.7,0     c17.8,0,35.8,0.7,53.6,0c0.3,0,0.5,0,0.8,0c12.9,0,12.9-20,0-20c-14.6,0-29.2,0-43.9,0c-35.1,0-70.2,0-105.3,0     c-42.3,0-84.5,0-126.8,0c-36.6,0-73.1,0-109.7,0c-17.8,0-35.8-0.7-53.6,0c-0.3,0-0.5,0-0.8,0C17.1,186.8,17.1,206.8,30,206.8     L30,206.8z"/></g>
                    </g>
                </g>
                <g>
                    <g>
                        <g>
                            <g><path
                                d="M150.4,268c11.4,11.4,22.7,22.7,34.1,34.1c9.1,9.1,23.3-5,14.1-14.1c-11.4-11.4-22.7-22.7-34.1-34.1      C155.4,244.8,141.3,258.9,150.4,268L150.4,268z"/></g>
                        </g>
                        <g>
                            <g><path
                                d="M184.5,253.9c-11.4,11.4-22.7,22.7-34.1,34.1c-9.1,9.1,5,23.3,14.1,14.1c11.4-11.4,22.7-22.7,34.1-34.1      C207.7,258.9,193.6,244.8,184.5,253.9L184.5,253.9z"/></g>
                        </g>
                    </g>
                    <g>
                        <g>
                            <g><path
                                d="M301.4,268c11.4,11.4,22.7,22.7,34.1,34.1c9.1,9.1,23.3-5,14.1-14.1c-11.4-11.4-22.7-22.7-34.1-34.1      C306.4,244.8,292.3,258.9,301.4,268L301.4,268z"/></g>
                        </g>
                        <g>
                            <g><path
                                d="M335.5,253.9c-11.4,11.4-22.7,22.7-34.1,34.1c-9.1,9.1,5,23.3,14.1,14.1c11.4-11.4,22.7-22.7,34.1-34.1      C358.7,258.9,344.6,244.8,335.5,253.9L335.5,253.9z"/></g>
                        </g>
                    </g>
                </g>
                <g>
                    <g><path
                        d="M219.2,380.2c9.6-7,20.8-10.7,32.6-10.2c10.7,0.4,19.9,4.5,28.8,10.2c10.8,7,20.9-10.3,10.1-17.3    c-11.8-7.6-24.6-12.5-38.9-13c-15-0.5-30.6,4.1-42.7,13c-4.4,3.2-6.5,8.7-3.6,13.7C208.1,380.9,214.8,383.4,219.2,380.2    L219.2,380.2z"/></g>
                </g>
            </svg> 

          </span>
              <p className="text-center text-gray-500 text-xl">No data available</p>
        </div> */}
        <table className="min-w-full border-collapse w-full">
          <thead>
            <tr>
              <th className="w-1/6 px-6 py-3 white text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Rayon
              </th>
              <th className="w-1/6 px-6 py-3 whitespace-no-wrap"></th>
            </tr>
          </thead>
          <tbody>
              <tr className="border-b hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-no-wrap relative uppercase"> 
                  {/* <img
                      className="h-10 w-10 rounded-full" 
                  /> */}
                  sukasari 2
                  </td>
                <td className="px-6 py-4 whitespace-no-wrap"></td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <span className="px-2">|</span>
                  <button
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
          </tbody>
        </table>
      {/* {totalPages > 1 && (
        <div className="mt-4 flex justify-start">
          <ul className="flex mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`mx-1 cursor-pointer flex items-center justify-center w-[40px] h-[40px] ${
                  currentPage === index + 1 ? 'font-semibold bg-blue-500 rounded-md text-white' : 'font-normal'
                }`}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  </div>
  )
}

export default TableEskul