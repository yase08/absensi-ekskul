
import { useState, useEffect } from "react";
import {BsPencil} from "react-icons/bs"
import {LuTrash} from "react-icons/lu"

const Table = () => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  // Dummy data array (same as before)
  const dummyData = [
    { id: 1, game: "Game 1", popularity: 85 },
    { id: 2, game: "Game 2", popularity: 92 },
    { id: 3, game: "Game 3", popularity: 78 },
    { id: 4, game: "Game 4", popularity: 91 },
    { id: 5, game: "Game 5", popularity: 67 },
    { id: 6, game: "Game 6", popularity: 73 },
    { id: 7, game: "Game 7", popularity: 88 },
    { id: 8, game: "Game 8", popularity: 79 },
    { id: 9, game: "Game 9", popularity: 82 },
    { id: 10, game: "Game 10", popularity: 94 },
    { id: 11, game: "Game 10", popularity: 94 },
    { id: 12, game: "Game 10", popularity: 94 },
    { id: 13, game: "Game 10", popularity: 94 },
    { id: 14, game: "Game 10", popularity: 94 },
    { id: 15, game: "Game 10", popularity: 94 },
    { id: 16, game: "Game 10", popularity: 94 },
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  useEffect(() => {
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the data to display on the current page
    const dataToDisplay = dummyData.slice(startIndex, endIndex);
    setCurrentPageData(dataToDisplay);
  }, []);

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-7 mt-10">
      <div className="bg-white">
      <div className="w-full h-[70px] flex items-center border-b-[1px] px-[25px] justify-between  ">
          <p className="font-poppins font-bold capitalize">Popular Data</p>
          </div>
        <table className="min-w-full mt-7">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-white text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 bg-white text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Game
              </th>
              <th className="px-6 py-3 bg-white text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Popularity
              </th>
              <th className="px-6 py-3 bg-white text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          {currentPageData.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className=" text-center py-6 ">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentPageData.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.game}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.popularity}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3 whitespace-no-wrap border-b border-gray-200">
                    <button className="hover:text-blue-500">
                      <BsPencil />
                    </button>
                    <button className="hover:text-red-500">
                      <LuTrash/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="py-4 flex justify-end pr-4 bg-white">
        <ul className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-3 py-1 rounded-md`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Table;
