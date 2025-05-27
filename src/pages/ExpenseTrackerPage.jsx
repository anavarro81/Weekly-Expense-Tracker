import { FiPlus, FiSettings, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight} from "react-icons/fi";
import { useState } from "react";
import SettingsSideBar from './SettingsSideBar'

const ExpenseTrackerPage = () => {

  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const expenses = [
    { id: 1, date: '2023-10-01', concept: 'Groceries', category: 'Food', amount: 50 },
    { id: 2, date: '2023-10-02', concept: 'Utilities', category: 'Bills', amount: 100 },
    { id: 3, date: '2023-10-03', concept: 'Transport', category: 'Travel', amount: 20 },
  ];

  const sumarizeExpenses = {
    total: 358,
    weeklyLimit:500,
    
  }

  const pagination = {
    actPage: 1,
    totalPages: 5,
    totalExpenes: 25,
  }

  const newExpense = () => {
    expenses
    
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
                      onClick={ () => newExpense ()  }
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
                <p className="text-2xl text-green-600">$0.00</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2"> Limite semanal </h2>
                <p className="text-2xl text-blue-600">$0.00</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2"> Progreso </h2>
                  <div className='w-full bg-gray-200 rounded h-2.5'>                    		
                        <div className='bg-green-500 h-2.5 rounded'                         
                        style={{ width: `${ sumarizeExpenses.total / sumarizeExpenses.weeklyLimit * 100}%` }}></div>				
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
                {expenses &&
                  expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4"> {expense.date} </td>
                      <td> {expense.concept} </td>
                      <td> {expense.category} </td>
                      <td> {expense.amount} </td>
                      <td className=""> 
                        <div className="flex space-x-2">
                          <FiEdit2 className="text-blue-500 w-5 h-5"/> 
                          <FiTrash2 className="text-red-500 w-5 h-5"/>
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