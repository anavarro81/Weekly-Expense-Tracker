import { FiPlus, FiSettings, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiCheck, FiX} from "react-icons/fi";
import { useState } from "react";
import SettingsSideBar from './SettingsSideBar'

const ExpenseTrackerPage = () => {

  const [isOpenSettings, setIsOpenSettings] = useState(false);
  
  const [editExpenseId, setEditExpenseId] = useState(null);

  const [newExpenseRow, setnewExpenseRow] = useState(true)
  
  const [newExpesense, setNewExpense] = useState({
    id: 0, date: "", concept: "", category: "", amount: 0
  })
  
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-06-06', concept: 'Groceries', category: 'Food', amount: 20 },
    { id: 2, date: '2025-06-06', concept: 'Utilities', category: 'Bills', amount: 10 },
    { id: 3, date: '2025-06-06', concept: 'Transport', category: 'Travel', amount: 5 },

  ])

  const [editedExpense, setEditedExpense] = useState({})

  
  
  const categories = [
    "Comida",
    "Restaurantes",
    "Compras",
    "Otras"
  ]


  const editExpense = (id) => {    
    setEditExpenseId(id)
    const currentExpense = expenses.find(expense => expense.id == id)
    setEditedExpense(currentExpense)
    
  }

  const deleteExpense = (id) => {    
    const filteredExpenses = expenses.filter(expense => expense.id !== id )
    setExpenses(filteredExpenses)
    
  }

  const editExpendeData = (e) => {
    const { name, value } = e.target;
    
    setExpenses(expenses.map(expense => 
      expense.id === editExpenseId 
      ? {...expense, [name]: value}
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


  
  const settings = {
    maxExpensePerWeek: 50
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
    console.log(newExpesense)
  }

  const addExpense = () => {    
    setExpenses(prevExpenses => [...prevExpenses, newExpesense]);
    setNewExpense({...newExpenseRow, id: expenses.length + 1})
    setnewExpenseRow(false)
  }


  /* Total Expense and Progress */ 
  
  const totalWeekExpense = expenses.reduce((totalExpense, currentExpense) => {
    return totalExpense + currentExpense.amount
  }, 0)

  const progressPercentaje = totalWeekExpense / settings.maxExpensePerWeek > 1 ? 1 : totalWeekExpense / settings.maxExpensePerWeek
  
  

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
                <p className="text-2xl text-green-600">{totalWeekExpense} €</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2"> Limite semanal </h2>
                <p className="text-2xl text-blue-600"> {settings.maxExpensePerWeek} € </p>
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
                                <option value={category}> {category} </option>
                              ))}
                            </select> 
                          
                          </td>
                          <td > <input type="number" name="amount" className="border" onChange={editNewExpenseData} /> </td>  
                          <td className=""> 
                            <div className="flex space-x-2">
                              <button onClick={() => addExpense()}>	
                                <FiCheck className="text-green-500 w-5 h-5"/> 
                                </button>                          
                              <button onClick={() => cancelEditExp()}>
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

                      

                      
                      {editExpenseId == expense.id 
                        ? <td className="px-6 py-4"> <input type="date" name="date" value={expense.date} onChange={editExpendeData}/> </td>  
                        : <td className="px-6 py-4"> {expense.date} </td> }                     
                      
                      {editExpenseId == expense.id 
                        ? <td>  <input class="border" name="concept" type="input" placeholder={expense.concept} onChange={editExpendeData} /> </td>   
                        : <td> {expense.concept} </td> }
                      
                      {editExpenseId == expense.id ? 
                        <td>  
                          <select 
                            name="category"
                            onChange={editExpendeData}>
                            {categories.map((category) => (
                              <option value={category}> {category} </option>
                            ))}
                          </select> 
                        </td>  
                        : <td> {expense.category} </td> 
                      }                      
                      
                      {editExpenseId == expense.id 
                      ? <td > <input type="number" name="amount" className="border" onChange={editExpendeData} placeholder={expense.amount}/> </td>  : <td> {expense.amount} </td> }                     
                      
                      <td className=""> 
                        <div className="flex space-x-2">
                          {editExpenseId != expense.id ?
                          <> 
                          <button
                            onClick={() => editExpense(expense.id)}
                          >
                            <FiEdit2 
                            className="text-blue-500 w-5 h-5"/> 
                          </button>
                          
                          <button
                            onClick={() => deleteExpense(expense.id)}
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
          <SettingsSideBar setIsOpenSettings={setIsOpenSettings}/>
        )}
         


        </div>
    </div>
  )
}

 

export default ExpenseTrackerPage