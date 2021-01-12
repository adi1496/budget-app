import dom, {refreshDOM} from './../utils/dom.js';
import placeholders from './../utils/placeholders.js';
import Functions from './../utils/functions.js';

const initView = (state) => {
    dom.curency.forEach(el => el.textContent = state.curency);
    dom.headingMonth.textContent = Functions.getMonthYear();
    dom.headingMonth.dataset.id = Functions.getMonthYearLocalStorage();
    dom.balance.textContent = state.balance;
    dom.monthIncome.textContent = state.monthIncomesValue;
    dom.monthExpense.textContent = state.monthExpensesValue;
    dom.monthExpensePercent.textContent = `${state.monthExpensesPercentage}%`;
    state.incomes.forEach(income => addNewItemToDOM(income));
    state.expenses.forEach(expense => addNewItemToDOM(expense));
}

const firstLetterUppercase = (text) => {
    text = text.split('');
    text[0] = text[0].toUpperCase();
    return text.join('');
}

const addNewItemToDOM = (input) => {
    let element = placeholders.itemPlaceholder.replace('{%name%}', firstLetterUppercase(input.name));
    element = element.replace('{%id%}', input.id);
    element = element.replace('{%type%}', input.type);
    element = element.replace('{%description%}', input.description);
    element = element.replace('{%value%}', `${input.value}${input.curency}`);

    if(input.type === '+'){
        element = element.replace('{%class-color%}', 'item-value-blue');
        element = element.replace('{%percent-placeholder%}', '');
        dom.incomesList.insertAdjacentHTML('beforeend', element);
    }else if(input.type === '-') {
        element = element.replace('{%class-color%}', 'item-value-red');
        const percent = placeholders.percentPlaceholder.replace('{%percent%}', `${parseInt(input.percent)}%`);
        element = element.replace('{%percent-placeholder%}', ` ${percent}`);
        dom.expensesList.insertAdjacentHTML('beforeend', element);
    }

    refreshDOM();
}




const removeDomItem = (element) => {
    element.remove();
}






// SHOW / CLOSE INPUT POPUP
const showAddNewItemPopup = event => {
    let element;
    if(event.currentTarget.id === 'income-btn') {
        dom.root.style.setProperty('--color-inputs', '#0d66a1');
        element = placeholders.addPopupPlaceholder.replace(/{%type%}/g, 'Income');
        element = element.replace('{%class-btn%}', 'add-btn');
        element = element.replace('{%add-type%}', '+');
    }else if(event.currentTarget.id === 'expense-btn') {
        dom.root.style.setProperty('--color-inputs', '#ee2727');
        element = placeholders.addPopupPlaceholder.replace(/{%type%}/g, 'Expense');
        element = element.replace('{%class-btn%}', 'add-btn-red');
        element = element.replace('{%add-type%}', '-');
    }

    document.body.insertAdjacentHTML('beforeend', element);
}

const closeAddNewItemPopup = () => {
    document.getElementById('dark-screen-popup').remove();
}



const updateState = (state) => {
    dom.balance.textContent = state.balance;
    dom.monthIncome.textContent = state.monthIncomesValue;
    dom.monthExpense.textContent = state.monthExpensesValue;
    dom.monthExpensePercent.textContent = `${parseInt(state.monthExpensesPercentage)}%`;
}

const allowOnlyNumbersAndMathSymbols = (element) => {
    element.addEventListener('input', async e => {
        e.preventDefault();
        if(document.querySelector('.input-box-placeholder').style.visibility !== 'hidden'){
            document.querySelector('.input-box-placeholder').style.visibility = 'hidden';
        }
        const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '/', '*'];

        const arr = e.target.textContent.split('');
        const value = arr[arr.length - 1];

        let isAllowed = false;
        allowedChars.forEach(el => {
            if(el === value) {
                isAllowed = true;
            };
        });
        
        if(isAllowed === false) arr.pop();
        
        e.target.textContent = arr.join('');
    });
}

const clearInputs = () => {
    dom.inputDescription.value = '';
    dom.inputValue.value = '';
}

const addItemHoverClass = (e) => {
    dom.listsItems.forEach(item => {
        if(item !== e.currentTarget) item.classList.remove('item-hover');
    });
    e.currentTarget.classList.toggle('item-hover');
}

const Views = {
    initView: initView,
    addNewItemToDOM: addNewItemToDOM,
    removeDomItem: removeDomItem,
    updateState: updateState,
    showAddNewItemPopup: showAddNewItemPopup,
    closeAddNewItemPopup: closeAddNewItemPopup,
    allowOnlyNumbersAndMathSymbols: allowOnlyNumbersAndMathSymbols,
    clearInputs: clearInputs,
    addItemHoverClass: addItemHoverClass
}

export default Views;