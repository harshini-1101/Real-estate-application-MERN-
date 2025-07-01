import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }
      );
      const data = await res.json();
      console.log(data);
      console.log(formData);
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
    <div className='p-6 max-w-lg mx-auto'>
      <h1 className='font-semibold text-3xl text-center'>Sign Up</h1>
      <form className='p-5 flex gap-4 flex-col'>
        <input type='text' id="username" placeholder='Username' className='rounded-lg border p-3' onChange={handleChange}/>
        <input type='email' id="email" placeholder='Email' className='rounded-lg border p-3' onChange={handleChange}/>
        <input type='password' id="password" placeholder='Password' className='rounded-lg border p-3' onChange={handleChange}/>
        <button disabled={loading} className='rounded-lg text-white bg-slate-700 p-3 uppercase hover:opacity-80 disabled:opacity-90' onClick={handleSubmit}>{loading?'Loading...':'Sign Up'}</button>
      </form>
    </div>
    <div className='flex justify-center'>
      <p>Have an account?</p>
      <Link to={"/sign-in"}>
      <span className='text-blue-700 font-medium'>Sign In</span>
      </Link>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
    </>
  )
};