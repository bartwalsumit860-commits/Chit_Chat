import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { Loader, Loader2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    gender: "",
    file: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", input.fullName)
    formData.append("userName", input.userName)
    formData.append("password", input.password)
    formData.append("gender", input.gender)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
      }


    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div className="">
      <div className='max-w-6xl mx-auto border border-gray-200 shadow-lg mt-10 rounded-2xl p-10'>
        <h1 className='text-3xl font-bold text-orange-500'>Wellcome to the chit_chat!</h1>
        <h1 className='text-md text-gray-600 mt-2'>Sign Up here to create account to enjoy chating with friends !</h1>

        <div className="flex justify-center items-center">
          <form onSubmit={submitHandler} className='p-6 border border-gray-400 shadow-lg rounded-2xl mt-10 w-2xl'>
            <h1 className='text-3xl font-bold text-orange-500'>Sign Up!</h1>

            <div className="flex gap-3 mt-7">
              <label className='text-lg text-gray-700 w-[30%] text-center'>Full Name</label>
              <input type="text" name='fullName'
                className='h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 flex-1'
                placeholder='Antonio'
                value={input.fullName}
                onChange={changeEventHandler} />
            </div>

            <div className="flex gap-3 mt-3">
              <label className='text-lg text-gray-700 w-[30%] text-center'>User Name</label>
              <input type="text" name='userName'
                className='h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 flex-1'
                placeholder='Sharlock Holmes'
                value={input.userName}
                onChange={changeEventHandler} />
            </div>


            <div className="flex gap-3 mt-3">
              <label className='text-lg text-gray-700 w-[30%] text-center'>Password</label>
              <input type="password" name='password'
                className='h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 flex-1'
                value={input.password}
                onChange={changeEventHandler} />
            </div>


            <div className="flex gap-3 mt-3">
              <label className='text-lg text-gray-700 w-[30%] text-center'>Profile Photo</label>
              <input type="file" name='file'
                className='h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 cursor-pointer'
                accept='image/*'
                onChange={changeFileHandler} />
            </div>

            <div className="flex gap-3 mt-3">
              <label
                htmlFor="gender"
                className="text-lg text-gray-700 w-[30%] text-center"
              >
                Select Gender
              </label>

              <select
                name="gender"
                id="gender"
                value={input.gender}
                onChange={changeEventHandler}
                className="h-11 rounded-xl outline-none border border-gray-200 bg-slate-100 px-4 flex-1"
              >
                <option value="" disabled>Choose Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-700 hover:underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup