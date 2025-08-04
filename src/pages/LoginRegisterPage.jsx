import React, {use, useState} from 'react'
import {axiosInstance} from '../util/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegisterPage = () => {

  const INITIAL_STATE = {
    user: "",
    email: "",
    password: ""
  };
  
  const [isRegisterTab, setisRegisterTab] = useState("Registro")

  const [userData, setUserData] = useState(INITIAL_STATE)

  const [userDataError, setUserDataError] = useState({"errorUser": "", "errorEmail": "",  "errorPassword": ""})

  const notify = (type, message) => {
    
    if (type == "success") toast.success(message);   
    
    if (type == "error") toast.error(message)

  };


  const handleUserData = (e) => {
    const {name, value} = e.target
    setUserData(prev => ({...prev, [name]: value}))    
  }

  const createAccount = async (e) => {
    e.preventDefault();
    const {user, email, password} = userData;

    let valid = true;

    // Validación usuario
    if (!user) {
      setUserDataError(prev => ({...prev, errorUser: "El nombre de usuario es obligatorio"}));
      valid = false;
    } else {
      setUserDataError(prev => ({...prev, errorUser: ""}));
    }

    // Validación email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setUserDataError(prev => ({...prev, errorEmail: "El email es obligatorio"}));
      valid = false;
    } else if (!emailRegex.test(email)) {
      setUserDataError(prev => ({...prev, errorEmail: "El email no es válido"}));
      valid = false;
    } else {
      setUserDataError(prev => ({...prev, errorEmail: ""}));
    }

    // Validación password
    if (!password) {
      setUserDataError(prev => ({...prev, errorPassword: "La contraseña es obligatoria"}));
      valid = false;
    } else if (password.length < 6) {
      setUserDataError(prev => ({...prev, errorPassword: "La contraseña debe tener al menos 6 caracteres"}));
      valid = false;
    } else {
      setUserDataError(prev => ({...prev, errorPassword: ""}));
    }

    // Si todo es válido, aquí iría la lógica para crear la cuenta
    if (valid) {
      try {
        const {data} = await axiosInstance.post('/auth/register', userData)
        
        notify("success", "login correcto")
      } catch (error) {
        console.error('error al hacer el login', error);
        notify("error", "error en el login")
      }
      

    }
  }


  return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div>
            <button onClick={notify}>Guardar</button>
            <ToastContainer />
            </div>

       <input type="radio" name="tab" id="tab-registro" className="hidden peer/tab-registro" onChange={() => setisRegisterTab(true)} />
       <input type="radio" name="tab" id="tab-login" className="hidden peer/tab-login" onChange={() => setisRegisterTab(false)}/> 
            <div className="flex mb-6 border-b">
              <label htmlFor="tab-registro"
                className={`w-1/2 text-center py-2 font-semibold cursor-pointer border-b-2 ${isRegisterTab ? `border-blue-500 text-blue-500` : `text-gray-500 border-transparent`}`}>
            Registro
          </label>
          <label htmlFor="tab-login"
                 className={`w-1/2 text-center py-2 font-semibold cursor-pointer border-b-2 ${!isRegisterTab  ? `border-blue-500 text-blue-500` : `text-gray-500 border-transparent`}`}>
              Login
          </label>
      </div>

      {/* Formulario Registro */}
        <div id="regiter-tab" className={`${isRegisterTab  ? "block" : "hidden"}`}> 
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input type="text"
                name="user"
                onChange={handleUserData}
                placeholder="Tu nombre"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
                <p className="text-red-500 text-sm"> {userDataError.errorUser && userDataError.errorUser}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Correo electrónico</label>
              <input type="email" name="email"
                placeholder="email@ejemplo.com"
                onChange={handleUserData}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
                <p className="text-red-500 text-sm"> {userDataError.errorEmail && userDataError.errorEmail}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleUserData}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
                <p className="text-red-500 text-sm"> {userDataError.errorPassword && userDataError.errorPassword}</p>
            </div>
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={createAccount}
              >
              Crear cuenta
            </button>
            <p className="text-sm text-center mt-2 text-gray-600">
              ¿Ya tienes cuenta?
              <label htmlFor="tab-login" className="text-blue-500 hover:underline cursor-pointer">
                Inicia sesión
              </label>
            </p>
          </form>
        </div>

        {/* Formulario de Login */}
    <div id="login-tab" className={`${!isRegisterTab  ? "block" : "hidden"}`} >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input type="email"
                 placeholder="email@ejemplo.com"
                 className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input type="password"
                 placeholder="••••••••"
                 className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"/>
        </div>
        <button type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Iniciar sesión
        </button>
        <p className="text-sm text-center mt-2 text-gray-600">
          ¿No estás registrado?
          <label htmlFor="tab-registro" className="text-blue-500 hover:underline cursor-pointer">
            Crear cuenta
          </label>
        </p>
      </form>
    </div>
        


      </div>

    </div>

  )
}

export default LoginRegisterPage