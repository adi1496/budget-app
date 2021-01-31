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
    // console.log(docRef);
    // docRef.get().then(doc => {
    //     if(doc.exists){
    //         state = new State(doc.data());
    //     }else {
    //         console.log('No Document');
    //     }
    // }).catch(err => {
    //     console.log(err);
    // });

    const doc = await docRef.get();
    console.log(doc);
    state = new State(doc.data());

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