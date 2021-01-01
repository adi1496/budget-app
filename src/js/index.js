import dom from './utils/dom.js';
// import State from './utils/state.js';
import Model from './models/model.js';
import Views from './views/views.js';
import Functions from './utils/functions.js';

const initApp = () => {
    dom.curency.forEach(el => el.textContent = '€');
    dom.headingMonth.textContent = Functions.getMonthYear();
    dom.balance.textContent = 0;
    dom.monthIncome.textContent = 0;
    dom.monthExpense.textContent = 0;
    dom.monthExpensePercent.textContent = '0%';
    dom.incomesList.innerHTML = '';
    dom.expensesList.innerHTML = '';
}

const controller = () => {
    Views.valueFieldOnlyDecimalNumbers(dom.inputValue);

    dom.inputType.addEventListener('change', e => {
        e.preventDefault();
        Views.changeInputBorders(e.target.value);
    })

    dom.addItemForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = {
            type: dom.inputType.value,
            name: dom.inputName.value,
            description: dom.inputDescription.value,
            value: dom.inputValue.value
        }
        Model.createNewEntry(input);
    })
}

initApp();
controller();