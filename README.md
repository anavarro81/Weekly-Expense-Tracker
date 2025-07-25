![Interfaz de usuario](./img/DashBoard-[screen-shoot].jpg)



# Estados

| #  | Name              | Detalle                                                       |
|----|-------------------|---------------------------------------------------------------|
| 1  | createExpenseBtn  | Llama a: `createNewExpense`                                   |
| 2  | showSettingsBtn   | Muestra y oculta la ventana `setIsOpenSettings(!isOpenSettings)` |
| 3  | totalWeekExpense  |                                                               |
| 4  | weeklyLimit       | Estado. Se obtiene en `getData`                               |
| 5  | expenses          |                                                               |
| 6  | pagination        |                                                               |

---

## Botones de acción

| Botón              | ID                  | Función                         |
|--------------------|---------------------|----------------------------------|
|                    | editExpenseButton    | `editExpense(expense._id)`       |
|                    | deleteExpenseButton  | `deleteExpense(expense._id)`     |
| saveExpense        |                     | `saveExpense(expense)`          |
| cancelExpenseEdit  |                     | `cancelEditExp`                 |
