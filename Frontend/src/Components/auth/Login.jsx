import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    userName: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        dispatch(setUser(res.data.user));
        navigate("/")
      }

    }
    catch (error) {
      console.log(error)
      console.log(error?.response?.data?.message);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className='max-w-6xl mx-auto border border-gray-200 shadow-lg mt-4 md:mt-10 rounded-2xl p-4 md:p-10'>
        <h1 className='text-2xl md:text-3xl font-bold text-orange-500'>Wellcome Back User!</h1>
        <h1 className='text-sm md:text-md text-gray-600 mt-2'>Sign in to your account!</h1>

        <div className="flex justify-center items-center">
          <form onSubmit={submitHandler} className='p-4 md:p-6 border border-gray-400 shadow-lg rounded-2xl mt-6 md:mt-10 w-full max-w-md'>
            <h1 className='text-2xl md:text-3xl font-bold text-orange-500'>Login!</h1>

            <div className="flex flex-col md:flex-row gap-1 md:gap-3 mt-3">
              <label className='text-base md:text-lg text-gray-700 md:w-[30%] text-left md:text-center'
              >User Name</label>
              <input type="text" name='userName'
                className='h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 w-full'
                placeholder='Sharlock Holmes'
                value={input.userName}
                onChange={changeEventHandler} />
            </div>


            <div className="flex flex-col md:flex-row gap-1 md:gap-3 mt-3">
              <label className='text-base md:text-lg text-gray-700 md:w-[30%] text-left md:text-center'>Password</label>
              <input type="password" name='password'
                className='h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 w-full'
                value={input.password}
                onChange={changeEventHandler} />
            </div>

            {
              loading ?
                (
                  <button type='submit' className='p-2 bg-orange-400 rounded-2xl text-white w-full mt-4' disabled>
                    <Loader2 className="mx-auto h-6 w-6 animate-spin inline" />
                    Please wait</button>

                ) :
                (
                  <button type='submit' className='p-2 bg-orange-400 rounded-2xl text-white w-full mt-4'>Submit</button>
                )
            }

             <p className="mt-4 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-700 hover:underline">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login