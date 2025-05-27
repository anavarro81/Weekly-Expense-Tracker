
import {  FiX, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
const SettingsSideBar = ({setIsOpenSettings}) => {


  const [categories, setCategories]  = useState(["Comida", "Restaurantes", "Compras", "Otras"])
    

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
        <div className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' onClick={ () => setIsOpenSettings(false)}> </div>
          <div className="fixed inset-y-0 right-0">
            <div className="flex flex-col  bg-white max-w-xl p-6  "> 
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-2xl"> Setting </h2>
                <button className="hover:bg-gray-400 hover:rounded-full "onClick={() => setIsOpenSettings(false) }>
                  <FiX />
                </button>
              </header>
                <form className="flex flex-col space-y-2">
                  
                  <div> 
                    <label htmlFor="maximumExpense"> Importe Maximo Semanal</label>
                    <input 
                      type="number" 
                      className="w-full border rounded-[8px] py-2 px-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="newCategoryNane"> Añadir una nueva categoria</label>
                    <input type="text" />
                    <button> Añadir </button>                  
                  </div>

                  <label htmlFor="categories"> Categorias </label>
                  <div>

                    {categories && categories.map((categorie) => (
                      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 mb-2"> {categorie} 
                      <FiTrash2/>
                      </div>
                    ))}

                  </div>

                  <div className="flex space-x-2 justify-center">
                    <button className="px-4 py-2 bg-blue-500 text-white"> Salvar cambios </button>
                    <button className="px-4 py-2 bg-red-500 text-white"> Resetear semana</button>
                  </div>

                  

                  
                </form>         
            </div>
                      
        </div>
     </div>
  )
}

export default SettingsSideBar