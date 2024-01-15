import React, { useState , useEffect} from 'react'
import Modal from 'react-modal';
import poto from '../../../assets/tesgaleri.jpeg'
import json from './GaleriData.json'

const Jumbo = () => {
    const [openHover, setOpenHover] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
  
    const handleOpenHover = () => {
      setOpenHover(!openHover);
    };
  
    const handleImageClick = (item) => {
      setSelectedImage(item.image);
      setSelectedName(item.imageName)
    };
  
    useEffect(() => {
      Modal.setAppElement('#root');
    }, []);
  
  

  return (
    <div className='w-full bg-transparent px-[10px] h-auto flex items-center justify-center mt-[20px]'>
    <div className='max-w-[1000px] bg-transparent  flex flex-col gap-[20px] w-full h-full'>
        <div className='w-full h-auto bg-transparent flex items-start flex-col justify-start gap-[5px]'>
    <p className='text-[25px] font-bold uppercase text-center text-black'>gallery</p>
    <p className='text-[14px] font-medium text-opacity-60 uppercase text-center text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nemo.</p>
        </div>
        <div className='w-full h-auto py-[10px] bg-transparent flex justify-between items-center'>
            <p className='capitalize text-[16px]'>first page</p>
            <div className='flex gap-[10px] items-center max-sm:hidden'>
                <button className='hover:bg-blue-500 text-black hover:text-white p-[10px] capitalize rounded-md text-[14px]'>all</button>
                <select name="" id="" value="default">
                    <option value="default">Default</option>
                    <option value="1">Default</option>
                    <option value="2">Default</option>
                    <option value="3">Default</option>
                    <option value="4">Default</option>
                </select>
                <div className='bg-white rounded-md border border-black overflow-hidden border-opacity-30'>
                    <input type="text" placeholder='search here!!' className='outline-none placeholder:capitalize px-[10px] placeholder:text-[14px]'/>
                    <button className='p-[10px] text-[14px] border-l border-black border-opacity-30 hover:bg-blue-500 hover:text-white capitalize'>search</button>
                </div>
            </div>
            <button className='sm:hidden'>:</button>
        </div>
        <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-[2%] mx-1'>
        {json.map((item) => (
            <button
              key={item.id}
              onClick={() => handleImageClick(item)}
              className='flex gap-[5px] flex-col items-center justify-start'
            >
              <div className='relative'>
                <img src={item.image} alt="" className='rounded-md' />
                {openHover && (
                  <p className='absolute right-[5px] bg-blue-500 text-white p-[5px] rounded-sm text-[12px] bottom-[5px] uppercase font-bold'>
                    {item.category}
                  </p>
                )}
              </div>
              <div className='w-full text-black rounded-md flex items-center justify-between'>
                <p className='text-[12px] capitalize font-medium'>{item.imageName}</p>
                <p className='text-[12px] capitalize'>{item.date}</p>
              </div>
            </button>
          ))}
        </div>
    </div>
     {/* Modal for fullscreen image */}
     <Modal
        isOpen={selectedImage !== null}
        onRequestClose={() => setSelectedImage(null)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <div className='relative'>
            <img src={selectedImage} alt="Fullscreen" />
            <p  className='absolute text-[30px] rounded-md bg-blue-500 p-[10px] bottom-[10px] right-[10px] text-white font-bold'>{selectedName}</p>
        </div>
        
      </Modal>
    </div>
  )
}

export default Jumbo