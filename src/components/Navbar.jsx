import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='bg-[#081634] text-white flex justify-between items-center px-80 h-20'>
        <div className="logo font-bold text-2xl">
            <span className='text-blue-400'>&lt;</span>
            Pass
            <span className='text-blue-400'>Save/&gt;</span>
        </div>
        <a href='https://github.com/JapnoorHere' target='_blank' className='flex items-center justify-center gap-3 bg-blue-400 p-1 rounded-full cursor-pointer hover:bg-blue-500'>
        <FaGithub fontSize={40}/>
        <p className='text-xl pr-1'>Github</p>
        </a>
    </nav>
  )
}

export default Navbar
