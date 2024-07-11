import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { RiFunctionAddFill } from 'react-icons/ri'

const Manager = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const handlePasswordVisibleClick = () => {
        setPasswordVisible(!passwordVisible);
    }
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

    }, []);

    const savePassword = () => {
        setPasswordArray([...passwordArray, form]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
        console.log([...passwordArray, form]);
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>

            <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
            <div className='mx-auto max-w-4xl'>
                <h1 className='mt-10 text-4xl font-bold text-white text-center'>
                    <span className='text-blue-400'>&lt;</span>
                    Pass
                    <span className='text-blue-400'>Save/&gt;</span>
                </h1>
                <p className='text-lg text-white text-center'>Your own Password Manager</p>
                <div className='flex flex-col p-4 gap-4'>
                    <input value={form.site} name='site' onChange={handleInputChange} type="text" placeholder="Website URL" className='rounded-md py-2 px-2 focus:outline-none border-4 border-blue-400 ' />
                    <div className="flex gap-4">
                        <input value={form.username} name='username' onChange={handleInputChange} type="text" placeholder="Username / Email" className='rounded-md py-2 px-2 focus:outline-none w-full border-4 border-blue-400 ' />
                        <div className='relative flex items-center'>

                            <input value={form.password} name='password' onChange={handleInputChange} type={passwordVisible?'text':'password'} placeholder="Password" className='rounded-md py-2 px-2 focus:outline-none border-4 border-blue-400 ' />

                            <span onClick={() => handlePasswordVisibleClick()} className='text-blue-400 absolute right-3 cursor-pointer'><FaEyeSlash className={!passwordVisible && `hidden`} />
                                <FaEye className={passwordVisible && `hidden`} /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className=' flex items-center justify-content justify-center gap-2 text-xl px-8 text-white bg-blue-400 p-2 self-center rounded-md border-2 border-white hover:border-blue-400 hover:bg-white hover:text-blue-400'><RiFunctionAddFill fontSize={25} /> Save Password</button>
                </div>

                <div className="passwords mt-10">
                    <h1 className='text-white text-xl font-bold'>Your Passwords</h1>
                    {passwordArray.size == 0 && <p className='text-white'>No passwords to show.</p>}
                    {passwordArray.length != 0 && <table className="table-auto text-white w-full rounded-md overflow-hidden">
                        <thead className='bg-blue-400'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100 text-black'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className='py-2 w-32 text-center'><a href={item.site}>{item.site}</a></td>
                                    <td className='py-2 w-32 text-center'>{item.username}</td>
                                    <td className='py-2 w-32 text-center'>{item.password}</td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
