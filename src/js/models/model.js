import firebase from 'firebase/app';
import 'firebase/firestore';

import Views from './../views/views.js';
import State from './../utils/state.js';
import Functions from './../utils/functions.js';


// Update localStorage
const updateLocalStorage = (newState) => {
    window.localStorage.setItem(Functions.getMonthYearLocalStorage(), JSON.stringify(newState));
}

//Init State
let state;
const initState = async () => {
    const db = firebase.firestore();
    // const localStorageData = window.localStorage.getItem(Functions.getMonthYearLocalStorage());
    const userId = JSON.parse(window.localStorage.getItem('user')).userId;
    const docRef = db.collection('users').doc(userId)
    .collection('months').doc(Functions.getMonthYearLocalStorage());

    const doc = await docRef.get();
    if(doc.exists){
        // if doc exists, get the data
        state = new State(doc.data());
    }else {
        // if doc doesn't exist create a new doc(maybe started another month)
        console.log('Document does not exists');
        const newState = {
            balance: 0,
            monthIncomesValue: 0,
            monthExpensesValue: 0,
            monthExpensesPercentage: 0,
            incomes: [],
            expenses: []
        }
        db.collection('users').doc(userId).collection('months')
        .doc(Functions.getMonthYearLocalStorage()).set(newState);
        state = new State(newState);
    }

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

    Views.addNewItemToDOM(input);
    Views.updateState(state);
    // Views.clearInputs();

    // updateLocalStorage(state);
    const db = firebase.firestore();
    const userId = JSON.parse(window.localStorage.getItem('user')).userId;

    db.collection('users').doc(userId).collection('months')
    .doc(Functions.getMonthYearLocalStorage()).set({
        balance: state.balance,
        monthIncomesValue: state.monthIncomesValue,
        monthExpensesValue: state.monthExpensesValue,
        monthExpensesPercentage: state.monthExpensesPercentage,
        incomes: state.incomes,
        expenses: state.expenses
    });
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

    const db = firebase.firestore();
    const userId = JSON.parse(window.localStorage.getItem('user')).userId;
    
    db.collection('users').doc(userId).collection('months')
    .doc(Functions.getMonthYearLocalStorage()).set({
        balance: state.balance,
        monthIncomesValue: state.monthIncomesValue,
        monthExpensesValue: state.monthExpensesValue,
        monthExpensesPercentage: state.monthExpensesPercentage,
        incomes: state.incomes,
        expenses: state.expenses
    });
    // updateLocalStorage(state);
    // console.log(state);
}


// Create an Object with all functions
const Model = {
    initState: initState,
    createNewEntry: createNewEntry,
    deleteItemFromState: deleteItemFromState
}

export default Model;