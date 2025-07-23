import { FiPlus, FiSettings, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiCheck, FiX} from "react-icons/fi";
import { useState, useEffect } from "react";
import SettingsSideBar from './SettingsSideBar'
import {axiosInstance} from '../util/axios';

const ExpenseTrackerPage = () => {

  const [isOpenSettings, setIsOpenSettings] = useState(false);
  
  const [editExpenseId, setEditExpenseId] = useState(null);

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
        
        // console.log ('weeklyLimit ', weeklyLimit)
        // console.log ('categories', categories)
        // console.log ('expenses ', expenses)

        
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


    getData()
    

  }, [])
  
  


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

  

  const saveExpense = () => {    
    setEditExpenseId(null)   


  }

  const cancelEditExp = () => {    


      setExpenses(expenses.map(expense => 
      expense.id === editExpenseId 
      ? editedExpense
      : expense
    ))
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
  const addExpense = () => {    
    setExpenses(prevExpenses => [...prevExpenses, newExpesense]);
    setNewExpense({...newExpenseRow, id: expenses.length + 1})
    setnewExpenseRow(false)
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
{/* Header and buttons*/}
          <div className="flex justify-between items-center mb-8">
                <h1 className='text-6xl'> Expense Tracker </h1>                
                <div className="flex gap-2" id="buttons">
                    <button 
                      className="bg-blue-500 rounded-full text-white cursor-pointer p-2"
                      onClick={ () => createNewExpense()  }
                      >
                      <FiPlus className="w-8 h-8 cursor-pointer"/>
                    </button>
                    <button 
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
          <table className="w-full bg-white rounded-lg shadow-md mt-8 text-left">
              <tbody className="bg-white divide-y divide-gray-200"> 
                <th className="px-6 py-3 "> Fecha </th>
                <th> Concepto </th>
                <th> Categoria </th>
                <th> Cantidad </th>
                <th> Acciones </th>

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
                              <button onClick={() => addExpense()}>	
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
                            onClick={() => editExpense(expense._id)}
                          >
                            <FiEdit2 
                            className="text-blue-500 w-5 h-5"/> 
                          </button>
                          
                          <button
                            onClick={() => deleteExpense(expense._id)}
                          > 
                            <FiTrash2 className="text-red-500 w-5 h-5"/>
                          </button>                          
                          
                          
                          
                        </>
                        :  
                        <> 
                          <button
                            onClick={() => saveExpense(expense)}
                          >
                            <FiCheck 
                            className="text-green-500 w-5 h-5"/> 
                          </button>
                          <button 
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
{/* Expense Table */}
        <div>
        </div>
{/* Pagination */}                           
       <div className="flex justify-between mt-8">
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

{/* Settings Sidebar */}
        {isOpenSettings && (
          <SettingsSideBar setIsOpenSettings={setIsOpenSettings} limit={weeklyLimit}/>
        )}
         


        </div>
    </div>
  )
}

 

export default ExpenseTrackerPage