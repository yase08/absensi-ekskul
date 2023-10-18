import React, { useState, useEffect } from 'react';

const ColorSettingForm = ({ toggleOpenChangeBg }) => {
  const [backgroundColor, setBackgroundColor] = useState('#6777EF');
  const [savedBackgroundColor, setSavedBackgroundColor] = useState('');

  useEffect(() => {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
      setBackgroundColor(savedColor);
      setSavedBackgroundColor(savedColor);
    }
  }, []);

  // Custom color name list
  const colorNameList = [
    { name: 'Red', hex: '#ff0000' },
    { name: 'Green', hex: '#00ff00' },
    { name: 'Blue', hex: '#0000ff' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Yellow', hex: '#ffff00' },
  ];

  const getColorName = (hexColor) => {
    // Validate hexColor format
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
      return 'Invalid Color';
    }

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

  return (
    <div className='flex'>
        <div className='w-[20%] border-r p-2  overflow-y-scroll h-[600px] '>
            <div className='flex flex-col items-center gap-[8px] h-full w-full'>
            <button className='w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-white bg-blue-500'>Top</button>
            <button className='w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-black border border-gray-400'>Side</button>
            <button className='w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-black border border-gray-400'>Side</button>
            </div>
        </div>
    <div className='w-[80%] p-3'>
      <div className='flex flex-col w-full'>
        <button onClick={toggleOpenChangeBg}>Change Background</button>

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

      {/* Display color cards */}
      <div className='flex flex-col w-full bg-transparent' style={{ display: 'flex', marginTop: '10px' }}>
        <p className='mx-[5px] mt-10'>Select Color</p>
        <div className='h-[350px] overflow-y-scroll overflow-x-hidden hidden-scroll flex flex-col gap-3'>
        {colorNameList.map((color) => (
            <>
            <div className='border border-gray-400 rounded-t-lg rounded-b-md'>
                <div
                  key={color.name}
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
            </>
          
        ))}
        </div>
      </div>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
    </div>

    </div>
  );
};

export default ColorSettingForm;
