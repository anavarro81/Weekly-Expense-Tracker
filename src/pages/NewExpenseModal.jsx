import { FiTrash2, FiX } from "react-icons/fi";
import { useState } from "react";
import { axiosInstance } from "../util/axios";
import { ToastContainer, toast } from "react-toastify";

const NewExpenseModal = ({ categories, logedUserData, setIsOpenNewExpense }) => {
  // Toast Notifications
  const showError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  const [expense, setExpense] = useState({
    date: "",
    amount: 0,
    concept: "",
    category: "",
  });

  const [error, setError] = useState({
    expense: "",
    amount: "",
    concept: "",
    category: "",
  });

  const handleChangeDate = (event) => {
    console.log("valor de la fecha ", event.target.value);

    setExpense((prevExpense) => ({
      ...prevExpense,
      date: event.target.value,
    }));
  };

  const handleChangeAmount = (event) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      amount: event.target.value,
    }));
  };

  const handleChangeConcept = (event) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      concept: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      category: event.target.value,
    }));
  };

  const validateFiled = (name, value) => {
    switch (name) {
      case "date":
        if (value === "") return "Fecha no válida";
        return "";
      case "amount":
        if (value <= 0) return "Importe debe ser mayor que cero";
        return "";
      case "concept":
        if (value === "") return "Concepto no válido";
        return "";
      case "category":
        if (value === "") return "Categoria no válida";
        return "";
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    const error = validateFiled(name, value);

    setError((prevError) => ({ ...prevError, [name]: error ? error : "" }));
  };

  const isValidExpense = () => { };

  const saveExpense = async () => {
    const token = localStorage.getItem("authToken");
    const payload = { ...expense, userId: logedUserData._id };

    console.log("token ", token);
    console.log("payload ", payload);

    try {
      const { data } = await axiosInstance.post("/expenses/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Gasto dado de alta");
      successNotification("Gasto dado de alta");
    } catch (error) {
      console.error("Error al crear gasto:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="settingSideBar">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col  bg-white max-w-xl p-6  ">
            <header className="flex items-center justify-between mb-6">
              <h2 className="text-2xl"> New Expense </h2>
              <button
                className="hover:bg-gray-400 hover:rounded-full"
                onClick={() => setIsOpenNewExpense(false)}
              >
                <FiX />
              </button>
            </header>
            <form className="flex flex-col space-y-2 mb-2">
              <div>
                <label htmlFor="date"> Date </label>
                <input
                  type="date"
                  className="w-full border rounded-[8px] py-2 px-4"
                  defaultValue={""}
                  onChange={handleChangeDate}
                  onBlur={handleBlur}
                  name="date"
                />
                {error.date && (
                  <p className="text-sm text-red-500">{error.date}</p>
                )}
              </div>
              <div>
                <label htmlFor="amount"> Amount </label>
                <input
                  type="number"
                  className="w-full border rounded-[8px] py-2 px-4"
                  defaultValue={0}
                  onChange={handleChangeAmount}
                  onBlur={handleBlur}
                  name="amount"
                />
                {error.amount && (
                  <p className="text-sm text-red-500">{error.amount}</p>
                )}
              </div>

              <div>
                <label htmlFor="concept"> Concept </label>
                <input
                  type="text"
                  className="w-full border rounded-[8px] py-2 px-4"
                  defaultValue=""
                  name="concept"
                  onChange={handleChangeConcept}
                  onBlur={handleBlur}
                />
                {error.concept && (
                  <p className="text-sm text-red-500">{error.concept}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="category"> Category </label>
                <select
                  name="category"
                  id="category"
                  onChange={handleChangeCategory}
                  onBlur={handleBlur}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {error.category && (
                  <p className="text-sm text-red-500">{error.category}</p>
                )}
              </div>
            </form>

            <div className="flex space-x-2 justify-center">
              <button
                id="saveChangesBtn"
                className="px-4 py-2 bg-blue-500 text-white"
                onClick={saveExpense}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExpenseModal;
