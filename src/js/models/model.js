import Views from './../views/views.js';
import State from './../utils/state.js';
import Functions from './../utils/functions.js';


// Update localStorage
const updateLocalStorage = (newState) => {
    window.localStorage.setItem(document.getElementById('heading-month').dataset.id, JSON.stringify(newState));
}

//Init State
let state;
const initState = () => {
    const data = Functions.getMonthYearLocalStorage();
    let localStorageData;
    if(window.localStorage.getItem(data)){
        localStorageData = JSON.parse(window.localStorage.getItem(data));
    }else {
        localStorageData = {
            balance: 0,
            monthIncomesValue: 0,
            monthExpensesValue: 0,
            monthExpensesPercentage: 0,
            incomes: [],
            expenses: [],
            curency: '€',
        }
    }
    state = new State(localStorageData);

    return state;
}




// Create New Income / Expense
const createNewEntry = (input) => {
    input.value = parseFloat(input.value);
    input.id = Date.now();

    if(input.type === '+') {
        state.updateIncomes(input);
    }else if(input.type === '-') {
        input.percent = (input.value * 100) / state.monthIncomesValue;
        input.percent = input.percent.toFixed(2);
        state.updateExpeses(input);
    }

    input.curency = state.curency;
    Views.addNewItemToDOM(input);
    Views.updateState(state);
    // Views.clearInputs();

    updateLocalStorage(state);
    console.log(state);
}


const deleteItemFromState = (type, id) => {
    id = parseInt(id);
    if(type === '+'){
        state.deleteIncome(id);
    }else if(type === '-') {
        state.deleteExpense(id);
    }

    Views.updateState(state);
    updateLocalStorage(state);
    // console.log(state);
}


// Create an Object with all functions
const Model = {
    initState: initState,
    createNewEntry: createNewEntry,
    deleteItemFromState: deleteItemFromState
}

export default Model;