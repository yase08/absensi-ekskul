import React, { useState, useEffect } from 'react';
import {BiRefresh} from 'react-icons/bi'
import Navbar from './Navbar';

const TopColor = ({ toggleOpenChangeBg }) => {
  const [backgroundColor, setBackgroundColor] = useState('#6777EF');
  const [savedBackgroundColor, setSavedBackgroundColor] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [colorNameList, setColorNameList] = useState([]);
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    const savedColor = localStorage.getItem('topColors');
    if (savedColor) {
      setBackgroundColor(savedColor);
      setSavedBackgroundColor(savedColor);
    }
  
    const savedCustomColors = JSON.parse(localStorage.getItem('topCustomColors')) || [];
    setColorList(savedCustomColors);
  
    // Load colorNameList from customColors in localStorage
    const customColorNameList = savedCustomColors.map(customColor => ({
      name: customColor.name,
      hex: customColor.hex
    }));
    setColorNameList([...colorNameList, ...customColorNameList]);
  }, []);


  const getColorName = (hexColor) => {
    const namedColor = colorNameList.find((color) => color.hex === hexColor);
    return namedColor ? namedColor.name : 'Unknown Color';
  };

  const handleColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('backgroundColor', backgroundColor);
    setSavedBackgroundColor(backgroundColor);
    window.location.reload(); 
  };

  const handleReset = () => {
    const defaultColor = '#6777EF';
    setBackgroundColor(defaultColor);
    setSavedBackgroundColor(defaultColor);

    localStorage.setItem('backgroundColor', defaultColor);
    window.location.reload(); 
  };

  const handleSetPredefinedColor = (color) => {
    setBackgroundColor(color);
  };

  const handleAddCustomColor = () => {
    const isValidFormat = /^#[0-9A-Fa-f]{6}$/.test(customColor);
    if (isValidFormat) {
      const updatedColorList = [...colorList, { name: `Warna ${colorList.length + 1}`, hex: customColor }];
      setColorList(updatedColorList);

      localStorage.setItem('topCustomColors', JSON.stringify(updatedColorList));

      setCustomColor('');
    window.location.reload(); 

    } else {
      alert('Invalid Color Format. Please enter a valid hex color code (e.g., RRGGBB).');
    }
  };


  const toggleRefresh = () => {
    window.location.reload(); 
  }

  return (
    <div className='flex'>
      {/* <Navbar toggleOpenFooter={toggleOpenFooter} toggleOpenTop={toggleOpenTop} openFooter={openFooter} openTop={openTop}/> */}
        <div className='w-[100%] p-3'>
          <div className='flex flex-col w-full'>
            <button onClick={toggleOpenChangeBg}>Top Background</button>

            <div className='mt-2'>
              <div className='w-full h-[100px] rounded-lg border border-gray-400' style={{ backgroundColor: backgroundColor }} />
              <div className='flex gap-x-2 items-center'>
                <input
                  type="color"
                  id="backgroundColor"
                  value={backgroundColor}
                  onChange={handleColorChange}
                />
            <p>{getColorName(backgroundColor)}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full bg-transparent' style={{ display: 'flex', marginTop: '10px' }}>
            <div className='mx-[5px] mt-10 my-4 flex justify-between'>
            <p>Select Color</p>
            <button onClick={toggleRefresh}>
              <BiRefresh className='text-2xl'/>
            </button>
            </div>
            <div className='max-h-[350px] overflow-y-scroll overflow-x-hidden hidden-scroll flex flex-col gap-3'>
              {colorNameList.length > 0 ? (
                colorNameList.map((color) => (
                  <div key={color.name} className='border border-gray-400 rounded-t-lg rounded-b-md'>
                    <div
                      style={{
                        backgroundColor: color.hex,
                        width: '100%',
                        height: '100px',
                        cursor: 'pointer',
                      }}
                      className='rounded-t-lg'
                      onClick={() => handleSetPredefinedColor(color.hex)}
                    ></div>
                    <div className='bg-light px-2 w-[100%] rounded-b-md'>{color.name}</div>
                  </div>
                ))
              ) : (
            <div className='text-gray-500 w-full h-full bg-transparent flex items-center justify-center flex-col'>
              <img src="https://media.tenor.com/C6m6gRHMOx8AAAAC/potatist.gif" alt="Potato GIF" className='w-full h-full'/>
                <div className='flex w-full mt-3 gap-1 text-white'>
                  <button onClick={handleSave} className='w-full p-2 rounded-md bg-blue-500'>
                    Save
                  </button>
                  <button onClick={handleReset} className='w-full p-2 rounded-md bg-red-500'>
                    Reset
                  </button>
                </div>
            </div>
              )}
            </div>
          </div>


          {colorNameList.length > 0 && (
            <div className='flex w-full mt-3 gap-1 text-white'>
              <button onClick={handleSave} className='w-full p-2 rounded-md bg-blue-500'>
                Save
              </button>
              <button onClick={handleReset} className='w-full p-2 rounded-md bg-red-500'>
                Reset
              </button>
            </div>
          )}

          {/* Input field for custom color */}
          <div className='flex flex-col gap-y-2' style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Input Your Custom HEX Color"
              value={customColor}
              className='w-full border border-gray-300 p-1 rounded-md'
              onChange={(e) => setCustomColor(e.target.value)}
            />
            <button onClick={handleAddCustomColor} className='w-full bg-blue-500 text-white p-1 rounded-md'>Add Custom Color</button>
          </div>
        </div>

    </div>
  );
};

export default TopColor;
