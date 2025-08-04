import React, {use, useState} from 'react'
import ExpenseTrackerPage from './pages/ExpenseTrackerPage'
import LoginRegisterPage from './pages/LoginRegisterPage'
// Impotar createBrowserRouter y RouterProvider
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {UserProvider} from '../src/Providers/UserProvider'

const App = () => {

  const router = createBrowserRouter([
    
    {
      path: '/',
      element: <LoginRegisterPage/> 
    },

    {
      path: '/dashboard',
      element: <ExpenseTrackerPage/>
    }


  ])
  
  return (
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App