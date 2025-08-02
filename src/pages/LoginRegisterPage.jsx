import React, {use, useState} from 'react'

const LoginRegisterPage = () => {

  const [tabSelected, setTabSelected] = useState("Registro")

  return (
        <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
       <input type="radio" name="tab" id="tab-registro" class="hidden peer/tab-registro" onChange={() => setTabSelected("Registro")} />
       <input type="radio" name="tab" id="tab-login" class="hidden peer/tab-login" onChange={() => setTabSelected("Login")}/> 
            <div class="flex mb-6 border-b">
              <label for="tab-registro"
                class={`w-1/2 text-center py-2 font-semibold cursor-pointer border-b-2 ${tabSelected == "Registro" ? `border-blue-500 text-blue-500` : `text-gray-500 border-transparent`}`}>
            Registro
          </label>
          <label for="tab-login"
                 class={`w-1/2 text-center py-2 font-semibold cursor-pointer border-b-2 ${tabSelected == "Login" ? `border-blue-500 text-blue-500` : `text-gray-500 border-transparent`}`}>
              Login
          </label>
      </div>

      {/* Formulario Registro */}
        <div id="regiter-tab" class={`${tabSelected === "Registro" ? "block" : "hidden"}`}> 
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium">Nombre</label>
              <input type="text"
                placeholder="Tu nombre"
                class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium">Correo electrónico</label>
              <input type="email"
                placeholder="email@ejemplo.com"
                class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium">Contraseña</label>
              <input type="password"
                placeholder="••••••••"
                class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <button type="submit"
              class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Crear cuenta
            </button>
            <p class="text-sm text-center mt-2 text-gray-600">
              ¿Ya tienes cuenta?
              <label for="tab-login" class="text-blue-500 hover:underline cursor-pointer">
                Inicia sesión
              </label>
            </p>
          </form>
        </div>

        {/* Formulario de Login */}
    <div id="login-tab" class={`${tabSelected === "Login" ? "block" : "hidden"}`} >
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Correo electrónico</label>
          <input type="email"
                 placeholder="email@ejemplo.com"
                 class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"/>
        </div>
        <div>
          <label class="block text-sm font-medium">Contraseña</label>
          <input type="password"
                 placeholder="••••••••"
                 class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"/>
        </div>
        <button type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Iniciar sesión
        </button>
        <p class="text-sm text-center mt-2 text-gray-600">
          ¿No estás registrado?
          <label for="tab-registro" class="text-blue-500 hover:underline cursor-pointer">
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