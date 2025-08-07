
import {  FiX, FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { useState, useRef, useEffect} from "react";
import {axiosInstance} from '../util/axios';
import { ToastContainer, toast } from 'react-toastify';

const SettingsSideBar = ({setIsOpenSettings, limit, setweeklyLimit, categories, setCategories})=> {

  
  const [settingCategories, setSettingCategories]  = useState(categories)
  const [weeklimit, setWeekLimit] = useState(limit)
  // Identifica la categoria que se está editando
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  
  // Estado para manejar el nombre de la nueva categoria
  const [newCategoryName, setNewCategoryName] = useState('');

  const [editedCategoryName, setEditedNewCategoryName] = useState('');

    // Toast Notifications
  const showError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  // 
  const inputRef = useRef(null)

  useEffect(() => {
    // Si estoy editando una categoria, enfoca el input correspondiente
    if (categoryToEdit !== null && inputRef.current) {
      inputRef.current.focus();
    }
  
  }, [categoryToEdit])
  


  const handleChangeLimit = (e) => {
    setWeekLimit(e.target.value)
  }

  const deleteCategory = (categorie) => {

    setSettingCategories(prev =>
      prev.filter(value => value._id !== categorie._id)
    );
  }

  const addCategory = (e) => {

    

    if (!newCategoryName.trim()) {
      showError('El nombre de la categoria no puede estar vacio');
      return;
    }

   if (settingCategories.some(cat => cat.name === newCategoryName)) {
      showError('La categoria ya existe');
      return;
    } 

    
    
    setSettingCategories(prev => [
      ...prev, {name: newCategoryName }
    ]);   
    
  }

  const editCategory = (categorie) => {

    if (!editedCategoryName.trim()) {
      showError('El nombre de la categoria no puede estar vacio');
      return;
    }

    if (settingCategories.some(cat => cat.name === editedCategoryName)) {
      showError('La categoria ya existe');
      return;
    } 


    
    const editedCategory = settingCategories.find(cat => cat._id === categorie._id).name = editedCategoryName;

    

    setCategoryToEdit(null)

  }


  const handleCategoryName = (e) => {

    setNewCategoryName(e.target.value)

  }

  const handleEditedCategoryName = (e) => {
    setEditedNewCategoryName(e.target.value)
  }


  const saveChange = async () => {

    const settings = {};

    settings.limit = weeklimit
    settings.categories = settingCategories;
  

    try {
      const { data: user } = await axiosInstance.put('/user/setting', settings)

      if (user) {
        successNotification('Datos actualizados correctamente');
        setweeklyLimit(user.weeklylimit)
        setIsOpenSettings(false)
        setCategories(settingCategories)
      }

    } catch (error) {
      console.log('Error al actualizar el límite semanal: ', error);
      showError('Error al actualizar el límite semanal')

    }

  }


    
    

  

    
    

  return (
    <div className='fixed inset-0 z-50 overflow-hidden' id="settingSideBar">
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
                    <input 
                      type="text" className="w-full border rounded-[8px] py-2 px-4" 
                      id="categoryName" 
                      onChange={handleCategoryName}
                      />
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={addCategory}
                        type="button"
                        id="addCategoryButton"
                        className="bg-blue-500 text-white rounded-[8px] py-2 px-4">  
                        Añadir
                        </button>                  
                    </div>
                  </div>

                  <label htmlFor="categories"> Categorias </label>
                  <div>
{/* Categorias */}
                    {settingCategories && settingCategories.map((categorie) => (
                      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 mb-2">                      
                      
                      {categorie._id === categoryToEdit 
                          ? 
                            (<input 
                                type="text" placeholder={categorie.name}
                                ref={inputRef}
                                onChange={handleEditedCategoryName}
                                onBlur={() => editCategory(categorie)}  
                                
                            />) 
                          : (<span>{categorie.name}</span>)
                      }
                      
                      
                      <div key={categorie._id} id="actionButtons" className="flex gap-2 items-center">
                        
                        <button
                          type="button"
                          id="editCategoryButton"
                          onClick={() => setCategoryToEdit(categorie._id)}
                          >
                          <TfiPencil />
                        </button>
                        
                        <button
                          type="button"
                          id="deleteCategoryButton"
                          onClick={() => deleteCategory(categorie)}
                        >
                          <FiTrash2/>
                        </button>
                      </div>
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