
import ExpenseTrackerPage from './pages/ExpenseTrackerPage'
import LoginRegisterPage from './pages/LoginRegisterPage'
// Impotar createBrowserRouter y RouterProvider
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {UserProvider} from '../src/Providers/UserProvider'
import RequireAuth from '../src/components/RequireAuth'

const App = () => {

  const router = createBrowserRouter([
    
    {
      path: '/',
      element: <LoginRegisterPage/> 
    },

    {
      path: '/dashboard',
      element: (
        <RequireAuth> 
          <ExpenseTrackerPage/>
        </RequireAuth>
      )      
    }


  ])
  
  return (
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App