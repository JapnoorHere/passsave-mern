import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#081634] text-white flex justify-between items-center px-80 h-20'>
        <div className="logo font-bold text-2xl">
            <span className='text-blue-400'>&lt;</span>
            Pass
            <span className='text-blue-400'>Save/&gt;</span>
        </div>
      <ul>
        <li className='flex gap-4 text-xl'>
            <a className='hover:text-blue-400' href="#">Home</a>
            <a className='hover:text-blue-400' href="#">About</a>
            <a className='hover:text-blue-400' href="#">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
