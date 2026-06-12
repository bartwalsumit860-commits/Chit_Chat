import React from 'react'
import Home from './Components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup';
import MessageBox from './Components/MessageBox';
import Profile from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/message/:id',
    element:<Home/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/profile/update',
    element:<UpdateProfile/>
  }
])
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App