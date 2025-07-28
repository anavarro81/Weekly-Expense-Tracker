![Interfaz de usuario](./img/DashBoard-[screen-shoot].jpg)

# Índice

- [Estados](#estados)
- [Botones de acción](#botones-de-acción)
- [Pantalla de configuración](#pantalla-de-configuración)
- [Toast (Notificaciones)](#toast-notificaciones)

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

| Botón                                                         | ID                  | Función                         |
|---------------------------------------------------------------|---------------------|----------------------------------|
| ![editExpenseButton](./img/editExpense.svg)              | editExpenseButton   | `editExpense(expense._id)`       |
| ![deleteExpenseButton](./img/deleteExpense.svg)          | deleteExpenseButton | `deleteExpense(expense._id)`     |
| ![ConfirmChanges](./img/confirmChanges.svg)          | saveExpense | `saveExpense(expense)`     |
| ![CancelChanges](./img/cancelChanges.svg)          | scancelExpenseEdit | `cancelEditExp`     |


### Pantalla de configuración
## Botones de acción

| Botón                                               | ID                    | Función                         |
|-----------------------------------------------------|-----------------------|---------------------------------| 
|  ![saveChangesButton](./img/saveChangesButton.jpg) | saveChangesBtn    | `saveExpense(expense)`       |


---

## Toast (Notificaciones)
  

`showError` -> Muestra una notificacion de error con el mensaje indicado. 
`successNotification` -> Muestra una notificacion de éxito con el mensaje indicado. 