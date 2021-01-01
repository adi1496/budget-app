import Views from './../views/views.js';
import State from './../utils/state.js';

//state
const state = new State();

const createNewEntry = (input) => {
    input.value = parseFloat(input.value);
    input.id = Date.now();

    if(input.type === '+') {
        state.updateIncomes(input);
    }else if(input.type === '-') {
        input.percent = (input.value * 100) / state.monthIncomesValue;
        state.updateExpeses(input);
    }

    input.curency = state.curency;
    Views.addNewItemToDOM(input);
    Views.updateState(state);
    Views.clearInputs();


    console.log(state);
}


const Model = {
    createNewEntry: createNewEntry
}

export default Model;