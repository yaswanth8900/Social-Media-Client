import '../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [inputData, setInputData] = useState({
    fname: '',
    lname: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    cpass: '',
  });

  const handleChange = (e) => { 
    const { id, value } = e.target; 
    setInputData((prevFormData) => ({ 
      ...prevFormData, 
      [id]: value 
    })); 
  }; 

  async function handleSubmit(e) {
    e.preventDefault();

    if (!Object.values(inputData).every(field => field.trim())) {
      toast.error('All fields are required');
      return;
    }

    if (inputData.password !== inputData.cpass) {
      toast.error('Passwords do not match');
      return;
    }

    const formData = {
      fname: inputData.fname,
      lname: inputData.lname,
      username: inputData.username,
      phone: parseInt(inputData.phone),
      email: inputData.email,
      password: inputData.password,
    };

    try {
      const response = await axios.post('http://localhost:3001/users/register', formData);
      toast.success(`Registration successful: ${response.data.username}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setInputData({
        fname: '',
        lname: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        cpass: '',
      });
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input id='fname' onChange={handleChange} type='text' placeholder='First Name' value={inputData.fname} className='input-field' />
        <input id='lname' onChange={handleChange} type='text' placeholder='Last Name' value={inputData.lname} className='input-field' />
        <input id='username' onChange={handleChange} type='text' placeholder='Username' value={inputData.username} className='input-field' />
        <input id='phone' onChange={handleChange} type='number' placeholder='Phone' value={inputData.phone} className='input-field' />
        <input id='email' onChange={handleChange} type='email' placeholder='Email' value={inputData.email} className='input-field' />
        <input id='password' onChange={handleChange} type='password' placeholder='Password' value={inputData.password} className='input-field' />
        <input id='cpass' onChange={handleChange} type='password' placeholder='Confirm Password' value={inputData.cpass} className='input-field' />
        <button type="submit" className='submit-button'>Register</button>
      </form>
      <ToastContainer />
    </div>
  );
}
