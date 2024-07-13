import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='bg-[#081634] text-white flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 h-16 sm:h-20'>
        <div className="logo font-bold text-xl sm:text-2xl">
            <span className='text-blue-400'>&lt;</span>
            Pass
            <span className='text-blue-400'>Save/&gt;</span>
        </div>
        <a href='https://github.com/JapnoorHere' target='_blank' className='flex items-center justify-center gap-2 sm:gap-3 bg-blue-400 p-1 sm:p-2 rounded-full cursor-pointer hover:bg-blue-500'>
        <FaGithub fontSize={30} className='sm:text-lg md:text-xl lg:text-2xl'/>
        <p className='text-lg sm:text-xl pr-1'>Github</p>
        </a>
    </nav>
  )
}

export default Navbar
