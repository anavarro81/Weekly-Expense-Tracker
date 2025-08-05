import React, {use, useState} from 'react'
import {axiosInstance} from '../util/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {useUser} from '../Providers/UserProvider'

const LoginRegisterPage = () => {

  const INITIAL_STATE = {
    user: "",
    email: "",
    password: ""
  };

  const navigate = useNavigate();
  
  const [isRegisterTab, setIsRegisterTab] = useState("Registro")

  const [userData, setUserData] = useState(INITIAL_STATE)

  const [errors, setErrors] = useState({})

  const {user, email, password} = userData

  const {logedUserData, setLogedUserData} = useUser()

  
  const notify = (type, message) => {

    switch(type) {
      case "success":
        toast.success(message);   
        break;
      case "error": 
        toast.error(message)
        break;
      default: 
        toast(message)
    }
    

  };


  const handleUserData = (e) => {

    
    
    const {name, value} = e.target


    setUserData(prev => ({...prev, [name]: value}))    
  }

  const validateForm = () => {
    
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Si estoy en la pestaña de registro, valido el nombre de usuario
    if(isRegisterTab) {
      
      // Se usa trim para evitar cadeas vacias, solo espacios por ejemplo: "   "
      if (!user.trim()) 
        newErrors.user = "El nombre del usuario el obligatorio"    
      
  }

      if (!email.trim()) newErrors.email = "El email es obligatorio";
      else if (!emailRegex.test(email)) newErrors.email = "El formato del email no es válido";

      if (!password) newErrors.password = "La contraseña es obligatoria";
      else if (password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    
    return newErrors;



  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

      

      const formErrors = validateForm()




      // Verifica is hay errores en el formulario. 
      // Si el objeto tiene alguna clave, significa que tiene errores. 
      if (Object.keys(formErrors).length > 0) {
        // Actualiza el estado de errores una sola vez
        setErrors(formErrors); 
        return;
    }
    
    // Inicializa los errores si todo va bien. 
    setErrors({})    

    const endpoint = isRegisterTab ? '/auth/register' : '/auth/login'
    const payload  = isRegisterTab ? {user, email, password} : {email, password}

      console.log('endpoint ', endpoint)
      console.log('payload ', payload)
    
      try {
        const {data} = await axiosInstance.post(endpoint, payload)

        console.log('data ', data)

        if(!isRegisterTab) {
          console.log('autenfico al usuario...')
          console.log('data.userInfo', data.userInfo);
          
          localStorage.setItem('authToken', data.userInfo.token)
          setLogedUserData(data.userInfo)
          navigate(`/dashboard`)
        } else {
          
          notify("success", "Usuario registrado con exito")  
        }


        
        

        
        
      } catch (error) {
        console.error('error al hacer el login', error);
        notify("error", "error en el login")
      }     

    
  }

  const switchTab = (isRegister) => {
      setIsRegisterTab(isRegister);
      setErrors({}); // Limpia los errores al cambiar de pestaña
      setUserData(INITIAL_STATE); // Resetea el formulario
  }



  return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div>            
            <ToastContainer />
            </div>

       <input type="radio" name="tab" id="tab-registro" className="hidden peer/tab-registro" onChange={() => switchTab(true)} />
       <input type="radio" name="tab" id="tab-login" className="hidden peer/tab-login" onChange={() => switchTab(false)}/> 
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
                <p className="text-red-500 text-sm"> {errors.user && errors.user}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Correo electrónico</label>
              <input type="email" name="email"
                placeholder="email@ejemplo.com"
                onChange={handleUserData}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
                <p className="text-red-500 text-sm"> {errors.email && errors.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleUserData}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
                <p className="text-red-500 text-sm"> {errors.password && errors.password}</p>
            </div>
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleSubmitForm}
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
                 name="email"
                 onChange={handleUserData}
                 placeholder="email@ejemplo.com"
                 className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input type="password"
                 placeholder="••••••••"
                 name="password"
                 onChange={handleUserData}
                 className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"/>
        </div>
        <button
        onClick={handleSubmitForm}        
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