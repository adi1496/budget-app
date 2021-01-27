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
    incomeBtn: getId('income-btn'),
    expenseBtn: getId('expense-btn'),
    addNewItemPopup: {
        inputValue: getId('input-value'),
        inputBoxPlaceholder: document.querySelector('.input-box-placeholder'),
        radioBtns: document.querySelectorAll('.radio-btn'),
        inputDescription: getId('input-description'),
        descriptionBoxPlaceholder: document.querySelector('.description-box-placeholder'),
        cancelBtn: getId('cancel-popup-btn'),
        submitBtn: getId('submit-btn')
    },
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

export const refreshAddNewItemPopupDOM = () => {
    dom.addNewItemPopup.inputValue = getId('input-value');
    dom.addNewItemPopup.inputBoxPlaceholder = document.querySelector('.input-box-placeholder');
    dom.addNewItemPopup.radioBtns = document.querySelectorAll('.radio-btn');
    dom.addNewItemPopup.inputDescription = getId('input-description');
    dom.addNewItemPopup.descriptionBoxPlaceholder = document.querySelector('.description-box-placeholder');
    dom.addNewItemPopup.cancelBtn = getId('cancel-popup-btn');
    dom.addNewItemPopup.submitBtn = getId('submit-btn');
}

export default dom;