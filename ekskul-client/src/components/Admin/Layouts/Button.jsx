import {BsArrowLeft} from 'react-icons/bs'


// eslint-disable-next-line react/prop-types
const Button = ({toggleExpansion, expanded}) => {
  return (
    <button onClick={toggleExpansion} className={`bg-white border rounded-full border-gray-300 absolute -right-[60px] z-[60] w-[50px] h-[50px] top-[50%] flex items-center justify-center ${expanded ? 'lg:hidden ':'lg:hidden max-lg:hidden'}`}><BsArrowLeft className='text-2xl'/></button>
  )
}

export default Button