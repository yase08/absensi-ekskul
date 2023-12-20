import React from 'react'
// import {LuPercent} from 'react-icons/lu'
import {SiPhpmyadmin} from 'react-icons/si'
import {AiOutlineUser} from 'react-icons/ai'
import {BsClockHistory} from 'react-icons/bs'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Table = ({expanded}) => {
    const dates = [
        {
            id: 1,
            date: '1',
            month: 'Jan'
        }, {
            id: 2,
            date: '2',
            month: 'Jan'
        }, {
            id: 2,
            date: '2',
            month: 'Jan'
        }, {
            id: 2,
            date: '2',
            month: 'Jan'
        }, {
            id: 2,
            date: '2',
            month: 'Jan'
        }, {
            id: 2,
            date: '2',
            month: 'Jan'
        }, {
            id: 2,
            date: '2',
            month: 'Jan'
        }, {
            id: 3,
            date: '3',
            month: 'Jan'
        },
        // tambahkan data tanggal sesuai kebutuhan
    ];
    return (
        <div className="w-full bg-transparent ">
            <div
                className={`bg-transition transition-all bg-transition duration-[700ms] relative bg-transparent text-white h-screen flex justify-between items-start ${expanded
                    ? 'w-[100%]'
                    : 'w-[100%]'} `}>
                <div className="w-full h-full -top-[42px] absolute px-7 ">
                    <div
                        className="rounded-lg overflow-hidden w-full items-start h-full text-black max-md:py-5 bg-white flex-col flex gap-2">
                        <div
                            className='items-center flex justify-between w-full p-5 capitalize font-bold text-[17px]'>
                            <h1>today&apos;s Schedule</h1>
                            <h1>2 mar, 2020</h1>
                        </div>
                        <div className='w-full h-auto bg-transparent px-5 py-2'>
                            <Slider
                                dots={false}
                                arrows={true}
                                infinite={true}
                                slidesToShow={6}
                                slidesToScroll={2}>
                                {
                                    dates.map(date => (
                                        <div key={date.id} className='px-5 py-2'>
                                            <div className='bg-red-500 rounded-lg shadow-lg p-5 h-full'>
                                                <h3 className='font-bold text-lg mb-2'>{date.date}</h3>
                                                <p className='text-gray-700 text-base'>{date.month}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
