import TopColor from "./TopColor"
import { useState } from "react"
import FooterColor from "./FooterColor"
import {BiText} from "react-icons/bi"
import {AiOutlineBorderTop, AiOutlineBorderBottom, AiOutlineBorderLeft, AiOutlineBorderRight} from 'react-icons/ai'
import TextColor from "../HiddenText/TextColor"
import SideColor from "./SideColor"

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  
  const [openTop, setOpenTop] = useState(true)

  const toggleOpenTop = () => {
    setOpenTop(!openTop)
    setOpenFooter(false)
    setOpenText(false)
    setOpenSide(false)

  }


  const handleReset = () => {
    const defaultColor = '#6777EF';
    localStorage.setItem('backgroundColor', defaultColor);
    localStorage.setItem('footerBackgroundColor', defaultColor);
    window.location.reload(); 
  };
  
  const [openFooter, setOpenFooter] = useState(false)

  const toggleOpenFooter = () => {
    setOpenFooter(!openFooter)
    setOpenTop(false)
    setOpenText(false)
    setOpenSide(false)

  }
  const [openText, setOpenText] = useState(false)

  const toggleOpenText = () => {
    setOpenText(!openText)
    setOpenTop(false)
    setOpenFooter(false)
    setOpenSide(false)
  }
  const [openSide, setOpenSide] = useState(false)

  const toggleOpenSide = () => {
    setOpenSide(!openSide)
    setOpenTop(false)
    setOpenText(false)
    setOpenFooter(false)

  }

  return (
    <div className='w-[100%] border-r p-2 flex overflow-y- hidden-scroll '>
      <div className="w-[20%] flex flex-col gap-[8px]">
        <button className="text-white bg-primary text-xs p-1 rounded-sm" onClick={handleReset}>Reset All</button>
        <h1 className="text-xs text-center border-b border-black">Background</h1>
        <button className={`w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-3xl flex items-center justify-center  ${openTop ? 'bg-blue-500 text-white ':'text-black border border-gray-400'}`} onClick={toggleOpenTop}><AiOutlineBorderTop/></button>
        <button className={`w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-black border border-gray-400 text-3xl flex items-center justify-center ${openFooter ? 'bg-blue-500 text-white ':'text-black border border-gray-400'}`} onClick={toggleOpenFooter}><AiOutlineBorderBottom/></button>
        <button className='w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-black border border-gray-400 text-3xl flex items-center justify-center' onClick={toggleOpenSide}><AiOutlineBorderLeft/></button>
        <button className='w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-black border border-gray-400 text-3xl flex items-center justify-center'><AiOutlineBorderRight/></button>
        <h1 className="text-xs text-center border-b border-black">Text</h1>
        <button className='w-full h-[65px] rounded-lg uppercase font-Gabarito font-bold text-black border border-gray-400 text-3xl flex items-center justify-center' onClick={toggleOpenText}><BiText/></button>
      </div>
      {openTop && (
      <div className="w-full">
          <TopColor openTop={openTop}/>
      </div>
      )}
      {openFooter && (
      <div className="w-full">
          <FooterColor/>
      </div>
      )}
      {openSide && (
      <div className="w-full">
          <SideColor/>
      </div>
      )}
      {openText && (
      <div className="w-full">
          <TextColor toggleOpenText={toggleOpenText}/>
      </div>
      )}
    </div>
  )
}

export default Navbar
