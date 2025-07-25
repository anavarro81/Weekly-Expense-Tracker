
import {  FiX, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import {axiosInstance} from '../util/axios';
import { ToastContainer, toast } from 'react-toastify';

const SettingsSideBar = ({setIsOpenSettings, limit, setweeklyLimit})=> {


  const [categories, setCategories]  = useState(["Comida", "Restaurantes", "Compras", "Otras"])
  const [weeklimit, setWeekLimit] = useState(limit)

    // Toast Notifications
  const showError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);


  const handleChangeLimit = (e) => {
    console.log('limite: ', e.target.value)
    setWeekLimit(e.target.value)
  }

  const saveChange = async () => {
    
    try {
      
      const {data: newlimit} = await axiosInstance.put('/settings/limit/settingsID', {limit: weeklimit})

      console.log('newlimit ', newlimit)
      
      if (newlimit) {
        successNotification('Limite semanal actualizado')
        setweeklyLimit(newlimit.limit)
        setIsOpenSettings(false)
      }


    } catch (error) {
      console.log('Error al actualizar el límite semanal: ', error);
      showError('Error al actualizar el límite semanal')
      
      
    }
    
  }
    

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
        <div className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' > 
          <div className="fixed inset-y-0 right-0">
            <div className="flex flex-col  bg-white max-w-xl p-6  "> 
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-2xl"> Setting </h2>
                <button className="hover:bg-gray-400 hover:rounded-full" onClick={() => setIsOpenSettings(false)} >
                  <FiX />
                </button>
              </header>
                <form className="flex flex-col space-y-2">
                  
                  <div> 
                    <label htmlFor="maximumExpense"> Importe Maximo Semanal</label>
                    <input 
                      type="number" 
                      className="w-full border rounded-[8px] py-2 px-4"
                      defaultValue={limit}    
                      onChange={handleChangeLimit}    
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


                  

                  
                </form>         
                  
                  <div className="flex space-x-2 justify-center">
                    <button 
                      id="saveChangesBtn"
                      className="px-4 py-2 bg-blue-500 text-white"
                      onClick={saveChange}> 
                      Salvar cambios 
                      </button>
                    <button className="px-4 py-2 bg-red-500 text-white"> Resetear semana</button>
                  </div>

            </div>
                      
        </div>
        </div>
     </div>
  )
}

export default SettingsSideBar