import React, { useEffect, useState } from 'react'
import { FaCopy, FaEye, FaEyeSlash, FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md';
import { RiFunctionAddFill } from 'react-icons/ri'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    
    const [passwordArray, setPasswordArray] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState('');

    

    const savePassword = async () => {
        await fetch('http://localhost:3000/', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'same-origin',
            method: "POST",
            body: JSON.stringify(form)
        }).then(() => {
            fetch('http://localhost:3000/')
                .then((res) => res.json())
                .then((json) => {
                    setPasswordArray(json);

                })
            setForm({ site: "", username: "", password: "" })
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        })
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }

    const handleCopyClick = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(item => item._id !== id))
        fetch(`http://localhost:3000/${id}`, {
            method: "DELETE",
        }).then(() => {
            toast.success('Password deleted!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        })
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item._id === id)[0])
        setEditMode(true);
        setEditId(id);
    }

    const editSavePassword = async () => {
        await fetch(`http://localhost:3000/${editId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'same-origin',
            method: "PUT",
            body: JSON.stringify(form)
        }).then(() => {
            const updatedArray = passwordArray.map(item =>
                item._id === editId ? { ...form, _id: editId } : item
            );
            setPasswordArray(updatedArray);
            setEditMode(false);
            setForm({ site: "", username: "", password: "" });
            toast.success('Password updated!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        })
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

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
                    <div className="flex gap-2">
                        <input value={form.username} name='username' onChange={handleInputChange} type="text" placeholder="Username / Email" className='flex-2 rounded-md py-2 px-2 focus:outline-none w-full border-4 border-blue-400 ' />
                        <div className='relative flex items-center'>

                            <input value={form.password} name='password' onChange={handleInputChange} type={passwordVisible ? 'text' : 'password'} placeholder="Password" className='w-full rounded-md py-2 px-2 focus:outline-none border-4 border-blue-400 ' />

                            <span onClick={() => handlePasswordVisibleClick()} className='text-blue-400 absolute right-3 cursor-pointer'><FaEyeSlash className={!passwordVisible && `hidden`} />
                                <FaEye className={passwordVisible && `hidden`} /></span>
                        </div>
                    </div>
                    <button onClick={() => { editMode ? editSavePassword() : savePassword() }} className=' flex items-center justify-content justify-center gap-2 text-xl px-8 text-white bg-blue-400 p-2 self-center rounded-md border-2 border-white hover:border-blue-400 hover:bg-white hover:text-blue-400'><RiFunctionAddFill fontSize={25} /> Save Password</button>
                </div>

                <div className="passwords m-5">
                    <h1 className='text-white text-xl font-bold'>Your Passwords</h1>
                    {passwordArray.size == 0 && <p className='text-white'>No passwords to show.</p>}
                    {passwordArray.length != 0 && <table className="table-auto text-white w-full rounded-md overflow-hidden">

                        <thead className='bg-blue-400'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100 text-black'>
                            {passwordArray.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td className='py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site}>{item.site}</a>
                                                <FaCopy className='ml-2 cursor-pointer' onClick={() => handleCopyClick(item.site)} />
                                            </div>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                {item.username}
                                                <FaCopy className='ml-2 cursor-pointer' onClick={() => handleCopyClick(item.username)} />
                                            </div>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                {item.password}
                                                <FaCopy className='ml-2 cursor-pointer' onClick={() => handleCopyClick(item.password)} />
                                            </div>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <div className='flex gap-2 items-center justify-center'>
                                                <FaRegEdit fontSize={20} className='text-green-600 cursor-pointer' onClick={() => editPassword(item._id)} />
                                                <MdDelete fontSize={20} className='text-red-600 cursor-pointer' onClick={() => deletePassword(item._id)} />
                                            </div>
                                        </td>
                                    </tr>
                                );

                            })}

                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
