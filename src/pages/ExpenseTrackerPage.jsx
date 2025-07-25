import { FiPlus, FiSettings, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiCheck, FiX} from "react-icons/fi";
import { useState, useEffect } from "react";
import SettingsSideBar from './SettingsSideBar'
import {axiosInstance} from '../util/axios';
import { ToastContainer, toast } from 'react-toastify';


const ExpenseTrackerPage = () => {

  // Muestra | Oculta la ventana de configuración
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  
  // Identifica el registro editardo por su id
  const [editExpenseId, setEditExpenseId] = useState(null);

  // Muestra | Oculta una nueva fila al inicio de la tabla para insertar el nuevo gasto. 
  const [newExpenseRow, setnewExpenseRow] = useState(false)
  
  const [newExpesense, setNewExpense] = useState({
    id: 0, date: "", concept: "", category: "", amount: 0
  })

  const [weeklyLimit, setweeklyLimit] = useState(0)
  const [categories, setCategories] = useState([])
  
  const [expenses, setExpenses] = useState([])

  const [editedExpense, setEditedExpense] = useState({})

  useEffect(() => {
    
    
    const getData = async () => {
      try {

        // const response = await fetch('http://localhost:3000/expenses/')
        const {data} = await axiosInstance.get('/report/')

        console.log ('data ', data)

        setweeklyLimit(data.weeklyLimit.limit)
        setExpenses(data.expenses)
        setCategories(data.categories)
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


    getData()
    

  }, [])
  
  
  // Toast Notifications
  const showError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  const editExpense = (id) => {    
    setEditExpenseId(id)
    const currentExpense = expenses.find(expense => expense._id == id)
    setEditedExpense(currentExpense)
    
  }

  const deleteExpense = (id) => {    
    const filteredExpenses = expenses.filter(expense => expense._id !== id )
    setExpenses(filteredExpenses)
    
  }

  const editExpendeData = (e) => {
    const { name, value } = e.target;

    const newValue = name == "amount" ? parseFloat(value) : value
    
    setExpenses(expenses.map(expense => 
      expense._id === editExpenseId 
      ? {...expense, [name]: newValue}
      : expense
    ))
  }

  

  const saveExpense = async (expense) => {    

    
    const validExpense = validateExpenseData(expense)

    if (validExpense) {

      try {
        
        const updatedExpense = await axiosInstance.put(`/expenses/${expense._id}`, expense)        
        
        if (updatedExpense) {
          successNotification('¡Registro actualizado!')
          setEditExpenseId(null)
        }        

      } catch (error) {       
        showError("Error al actualizar el registro")
      }
      
      
      
      
    }  

       


  }


  const validateExpenseData = (expense) => {
  
  //   {
  //   "_id": "6881f1a4630243bf6c64ac1c",
  //   "date": "2025-07-25",
  //   "concept": "Rotulador",
  //   "category": "Compras",
  //   "amount": 2 
  // }

  const {date, concept, category, amount } = expense

  console.log('concept ', concept)
  
  if (!date || !date.trim()) {
    console.log('La fecha es obligatoria');
    showError("La fecha es obligatoria")
    return false;
  }
  if (!concept || !concept.trim()) {
    console.log('El concepto es obligatorio');
    showError("El concepto es obligatorio")
    return false;
  }
  if (!category || !category.trim()) {
    console.log('La categoría es obligatoria');
    showError("La categoría es obligatoria")
    return false;
  }

  if (amount <= 0) {
    console.log('La cantidad tiene que se mayor que cero');
    showError("La cantidad tiene que se mayor que cero")
    return false;
  }  

  return true
}

  // Si se cancela la edicion del registro se busca en el array original y sustituye por el valor que tenia: editedExpense

  

  const cancelEditExp = () => {    
      // 1) Se busca en el estado gastos (expenses) el registro por su id y si lo encuentra
      //    se sustituye por el valor que tenia. En el resto de casos se deja el que estaba. 
      setExpenses(expenses.map(expense => 
      expense.id === editExpenseId 
      ? editedExpense
      : expense
    ))
    // Se reinicia el id del gastos a editar. 
    // Se deshabilita la edición para que la fila no sea editable. 
    setEditExpenseId(null)
    setEditedExpense(null)


  }


  

  const pagination = {
    actPage: 1,
    totalPages: 5,
    totalExpenes: 25,
  }

  const createNewExpense = () => {
    setnewExpenseRow(!newExpenseRow)
    
  }

  /* New Expense Functions */
  
  const editNewExpenseData = (e) => {       
    const {name, value} = e.target    
    // Se convertier el importe a número para guardarlo. 
    const newValue = name === "amount" ? parseFloat(value): value
    setNewExpense({...newExpesense, [name]: newValue})    
  }
  
  // ✔️  Button
  const addExpense = async () => {
    try {
      console.log ('newExpesense ', newExpesense)
      const {data: created} = await axiosInstance.post('/expenses/', newExpesense);    
      setExpenses(prevExpenses => [...prevExpenses, created]);
      setnewExpenseRow(false)
    } catch (error) {
      console.error("Error al crear gasto:", error);
    }
      
    
    // setNewExpense({...newExpenseRow, id: expenses.length + 1})
    
  }

  const cancelAddNewExpense = () => {
    //
    setnewExpenseRow(false)
  }


  /* Total Expense and Progress */ 
  
  const totalWeekExpense = expenses.reduce((totalExpense, currentExpense) => {
    return totalExpense + currentExpense.amount
  }, 0)

  const progressPercentaje = totalWeekExpense / weeklyLimit > 1 ? 1 : totalWeekExpense / weeklyLimit
  
  // Format de MOngoDB date string as day of week and month
  const formatDate = (mongoDBString) => {
    const date = new Date(mongoDBString)
    return date.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });    
    
  }
  

  return (
    
    <div className="min-h-scren bg-gray-50 p-6">
        <div className='max-w-6xl mx-auto'>
          <ToastContainer position="top-right" type="error" />
{/* Header and buttons*/}
          <div className="flex justify-between items-center mb-8">
                <h1 className='text-6xl'> Expense Tracker </h1>                
                <div className="flex gap-2" id="buttons">
                    <button 
                      id="createExpenseBtn"
                      className="bg-blue-500 rounded-full text-white cursor-pointer p-2"
                      onClick={ () => createNewExpense()  }
                      >
                      <FiPlus className="w-8 h-8 cursor-pointer"/>
                    </button>
                    <button 
                      id="showSettingsBtn"
                      className="bg-gray-500 rounded-full text-white cursor-pointer p-2"
                      onClick ={() => setIsOpenSettings(!isOpenSettings) }>
                      <FiSettings className="w-8 h-8"/>
                    </button>
                </div>        
          </div>
{/* Sumarize buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" >
              
              
              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2">Gasto Total</h2>
                <p className="text-2xl text-green-600">{totalWeekExpense.toFixed(2)} €</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2"> Limite semanal </h2>
                <p className="text-2xl text-blue-600"> {weeklyLimit} € </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2"> Progreso </h2>
                  <div className='w-full bg-gray-200 rounded h-2.5'>                    		
                        <div className='bg-green-500 h-2.5 rounded'                         
                        style={{ width: `${ progressPercentaje * 100}%` }}></div>				
		                    </div>                  
              </div>            
          </div>
{/* Expense Table */}
          {expenses.length > 0 || newExpenseRow ?           
          
          <table className="w-full bg-white rounded-lg shadow-md mt-8 text-left">
              <tbody className="bg-white divide-y divide-gray-200"> 
                <th className="px-6 py-3 "> Fecha </th>
                <th> Concepto </th>
                <th> Categoria </th>
                <th> Cantidad </th>
                <th> Acciones </th>
                  {/* Muestra la primera fila en modo edición para agregar el gasto. */}
                  {newExpenseRow &&
                      <> 
                        <tr> 
                          <td className="px-6 py-4"> <input type="date" name="date" onChange={editNewExpenseData}/> </td> 
                          <td>  <input class="border" name="concept" type="input"  onChange={editNewExpenseData} /> </td>                        
                            <td>  
                            <select 
                              name="category"
                              onChange={editNewExpenseData}>
                              {categories.map((category) => (
                                <option value={category.name}> {category.name} </option>
                              ))}
                            </select> 
                          
                          </td>
                          <td > <input type="number" name="amount" className="border" onChange={editNewExpenseData} /> </td>  
                          <td className=""> 
                            <div className="flex space-x-2">
                              <button id="confirmNewExpens" onClick={() => addExpense()}>	
                                <FiCheck className="text-green-500 w-5 h-5"/> 
                                </button>                          
                              <button onClick={() => cancelAddNewExpense()}>
                                <FiX className="text-red-500 w-5 h-5"/>    
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>  
                      }

                {expenses &&
                  expenses.map((expense) => (

                    


                    <tr key={expense.id}>

                      

                      
                      {editExpenseId == expense._id 
                        ? <td className="px-6 py-4"> <input type="date" name="date" value={expense.date} onChange={editExpendeData}/> </td>  
                        : <td className="px-6 py-4"> {formatDate(expense.date)} </td> }                     
                      
                      {editExpenseId == expense._id 
                        ? <td>  <input class="border" name="concept" type="input" placeholder={expense.concept} onChange={editExpendeData} /> </td>   
                        : <td> {expense.concept} </td> }
                      
                      {editExpenseId == expense._id? 
                        <td>  
                          <select 
                            name="category"
                            onChange={editExpendeData}>
                            {categories.map((category) => (
                              <option value={category.name}> {category.name} </option>
                            ))}
                          </select> 
                        </td>  
                        : <td> {expense.category} </td> 
                      }                      
                      
                      {editExpenseId == expense._id 
                      ? <td > <input type="number" name="amount" className="border" onChange={editExpendeData} placeholder={expense.amount}/> </td>  : <td> {expense.amount} </td> }                     
                      
                      <td className=""> 
                        <div className="flex space-x-2">
                          {editExpenseId != expense._id ?
                          <> 
                          <button 
                            id="editExpenseButton"
                            onClick={() => editExpense(expense._id)}
                          >
                            <FiEdit2 
                            className="text-blue-500 w-5 h-5"/> 
                          </button>
                          
                          <button
                            id="deleteExpenseButton"
                            onClick={() => deleteExpense(expense._id)}
                          > 
                            <FiTrash2 className="text-red-500 w-5 h-5"/>
                          </button>                          
                          
                          
                          
                        </>
                        :  
                        <> 
                          <button id='saveExpense'
                            onClick={() => saveExpense(expense)}
                          >
                            <FiCheck 
                            className="text-green-500 w-5 h-5"/> 
                          </button>
                          
                          <button 
                            id="cancelExpenseEdit"
                            onClick={() => cancelEditExp()}
                          >
                          
                          <FiX className="text-red-500 w-5 h-5"/>    
                          </button>
                          
                          
                        </>

                      
                      }
                        
                        </div>
                      </td>
                      
                    </tr>
                  ))
                }
              </tbody>
          </table> 
          : <p className="text-center"> No hay gastos para esta semama </p>
          }
{/* Expense Table */}
{/* Pagination */}                           
        {expenses.length > 0 &&

       <div className="flex justify-between mt-8" id="pagination">
        <p className="text-sm text-gray-700"> { `Pagina ${pagination.actPage}  de ${pagination.totalPages} de ${pagination.totalExpenes}`}</p>
        <div className="flex space-x-2">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed">
            <FiChevronLeft className="w-5 h-5"/>
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed">
            <FiChevronRight className="w-5 h-5"/>
          </button>
       </div>

       </div> 
       
      }         

{/* Settings Sidebar */}
        {isOpenSettings && (
          <SettingsSideBar setIsOpenSettings={setIsOpenSettings} limit={weeklyLimit}/>
        )}
         


        </div>
    </div>
  )
}

 

export default ExpenseTrackerPage