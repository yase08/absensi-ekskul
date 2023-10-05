import { useState } from 'react';
import '../../../App.css'; // Atur file CSS utama di sini
import { FiSun, FiMoon } from 'react-icons/fi';

// eslint-disable-next-line react/prop-types
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <button
      className="text-2xl dark:text-white text-black text-opacity-80 hover:cursor-pointer max-md:w-full max-md:px-4 max-md:py-2 max-md:hover:bg-gray-100 max-md:hover:dark:hover:bg-gray-700 max-md:flex max-md:items-center max-md:gap-3"
      onClick={toggleDarkMode}
    >
      {darkMode ? <FiSun /> : <FiMoon />}
      {darkMode ? <p className='hidden max-md:block text-sm'>Light Mode</p> : <p className='hidden max-md:block text-sm'>Dark Mode</p>}
    </button>
  );
};

export default DarkModeToggle;
