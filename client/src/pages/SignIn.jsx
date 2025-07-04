import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  }
  const handleSubmit = async (e)=>{
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
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
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <>
    <div className='p-6 max-w-lg mx-auto'>
      <h1 className='font-semibold text-3xl text-center'>Sign In</h1>
      <form className='p-5 flex gap-4 flex-col'>
        <input type='email' id="email" placeholder='Email' className='rounded-lg border p-3' onChange={handleChange}/>
        <input type='password' id="password" placeholder='Password' className='rounded-lg border p-3' onChange={handleChange}/>
        <button disabled={loading} className='rounded-lg text-white bg-slate-700 p-3 uppercase hover:opacity-80 disabled:opacity-90' onClick={handleSubmit}>{loading?'Loading...':'Sign In'}</button>
      </form>
    </div>
    <div className='flex flex-col items-center'>
      <div className='flex gap-1'>
        <p>Do not have an account?</p>
        <Link to={"/sign-up"}>
        <span className='text-blue-700 font-medium'>Sign Up</span>
        </Link>
        </div>
        {error && (
          <p className='text-red-500 mt-2 text-center'>{error}</p>
          )
        }
      </div>
    </>
  )
};