const getId = (id) => {
    return document.getElementById(id);
}

const dom = {
    curency: document.querySelectorAll('#curency'),
    headingMonth: getId('heading-month'),
    month: getId('heading-month'),
    balance: getId('balance-value'),
    monthIncome: getId('income-month'),
    monthExpense: getId('expense-month'),
    monthExpensePercent: getId('expense-month-percent'),
    addItemForm: getId('form-add-item'),
    inputType: getId('input-type'),
    inputName: getId('input-name'),
    inputDescription: getId('input-description'),
    inputValue: getId('input-value'),
    incomesList: getId('incomes-list'),
    expensesList: getId('expenses-list'),
    listsItems: document.querySelectorAll('#list-item'),
    editListItem: document.querySelectorAll('#item-edit'),
    deleteListItem: document.querySelectorAll('#item-delete'),

    root: document.documentElement
}


export const refreshDOM = () => {
    dom.editListItem = document.querySelectorAll('#item-edit');
    dom.deleteListItem = document.querySelectorAll('#item-delete');
    dom.listsItems = document.querySelectorAll('#list-item');
}

export default dom;