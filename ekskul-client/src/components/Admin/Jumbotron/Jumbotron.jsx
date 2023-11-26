// import {LuPercent} from 'react-icons/lu'
import {SiPhpmyadmin} from 'react-icons/si'
import {AiOutlineUser} from 'react-icons/ai'
import {BsClockHistory} from 'react-icons/bs'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { getUsersCount } from '../../../services/auth.service'
// eslint-disable-next-line react/prop-types


const Jumbotron = ({expanded}) => {
    const [admin, setAdmin] = useState('')
    const [Instructor, setInstructor] = useState('')
    const [student, setStudent] = useState('')
    const [online, setOnline] = useState('')
    
    const handleGetRequest = async () => {
        try {
          const response = await getUsersCount();
    
          if (response && response.data) {
            console.log("API Response:", response.data);
            console.log(response);
    
              const responseData = response.data;
              setAdmin(responseData.adminCount);
              setInstructor(responseData.instructorCount)
              setStudent(responseData.studentCount)
              setOnline(responseData.activeUserCount)

          } else {
            console.log(new Error("Data retrieval failed"));
          }
        } catch (error) {
          console.log(error);
        } finally {
        //   setLoading(false);
        }
      };
    
      useEffect(() => {
        handleGetRequest();
      }, []);

    return (
    <div className="w-full bg-transparent ">
        <div className={`bg-transition transition-all bg-transition duration-[700ms] relative bg-transparent text-white max-lg:h-[140px] lg:h-[150px] 2xl:h-[190px] max-md:h-[450px] flex justify-between items-start ${expanded? 'w-[100%]':'w-[100%]'} `}>
            <div className="w-full h-full -top-[42px] absolute px-7 ">
                <div className="rounded-lg overflow-hidden w-full h-full text-black max-md:py-5 bg-white flex justify-between items-center gap-2 max-md:flex-col">
                    <div className="w-full flex justify-between items-center ">
                        <div className='ml-5'>
                            <p className='font-poppins text-lg font-bold opacity-80 max-2xl:text-sm'>Admin</p>
                            <p className='font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl '>{admin}</p>
                            <p className='font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs'>Increased By 90%</p>
                        </div>
                        <span className='mr-10'>
                            <SiPhpmyadmin className='text-5xl font-bold opacity-80 max-2xl:text-4xl'/>
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center ">
                        <div className='ml-5'>
                            <p className='font-poppins text-lg font-bold opacity-80 max-2xl:text-sm'>Instruktur</p>
                            <p className='font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl'>{Instructor}</p>
                            <p className='font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs'>Increased By 90%</p>
                        </div>
                        <span className='mr-10'>
                            <AiOutlineUser className='text-[46px] font-bold opacity-80 max-2xl:text-4xl'/>
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center ">
                        <div className='ml-5'>
                            <p className='font-poppins text-lg font-bold opacity-80 max-2xl:text-sm'>Siswa</p>
                            <p className='font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl'>{student}</p>
                            <p className='font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs'>Increased By 90%</p>
                        </div>
                        <span className='mr-10'>
                            <BsClockHistory className='text-[43px] font-bold opacity-80 max-2xl:text-4xl'/>
                        </span>
                    </div>
                    <div className="w-full flex justify-between items-center ">
                        <div className='ml-5'>
                            <p className='font-poppins text-lg font-bold opacity-80 max-2xl:text-sm'>Online</p>
                            <p className='font-poppins text-3xl opacity-80 ml-3 mt-2 max-2xl:text-xl'>{online}</p>
                            <p className='font-poppins text-sm mt-2 opacity-60 max-2xl:text-xs'>Increased By 90%</p>
                        </div>
                        <span className='mr-10'>
                            <HiOutlineStatusOnline className='text-5xl font-bold opacity-80 max-2xl:text-4xl'/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Jumbotron