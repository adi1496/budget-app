import dom, {refreshDOM} from './../utils/dom.js';
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



const itemPlaceholder = `<li id="list-item" data-id="{%id%}" data-type="{%type%}" class="item">
    <div class="item-name">{%name%}</div>
    <div class="item-description">{%description%}</div>
    <div class="item-value {%class-color%}">{%value%}{%percent-placeholder%}</div>
    <div class="item-options">
    <div class="item-edit" id="item-edit">
        <svg class="item-icon item-icon-edit">
            <use xlink:href="img/svg/icons.svg#icon-pencil"></use>
        </svg>
    </div>
    <div class="item-delete" id="item-delete">
        <svg class="item-icon item-icon-delete">
            <use xlink:href="img/svg/icons.svg#icon-cancel-circle"></use>
        </svg>
    </div>
    </div>
</li>`;

const percentPlaceholder = `<span class="item-percent" id="item-percent">{%percent%}</span>`;

const firstLetterUppercase = (text) => {
    text = text.split('');
    text[0] = text[0].toUpperCase();
    return text.join('');
}

const addNewItemToDOM = (input) => {
    let element = itemPlaceholder.replace('{%name%}', firstLetterUppercase(input.name));
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
        const percent = percentPlaceholder.replace('{%percent%}', `${parseInt(input.percent)}%`);
        element = element.replace('{%percent-placeholder%}', ` ${percent}`);
        dom.expensesList.insertAdjacentHTML('beforeend', element);
    }

    refreshDOM();
}




const removeDomItem = (element) => {
    element.remove();
}





const updateState = (state) => {
    dom.balance.textContent = state.balance;
    dom.monthIncome.textContent = state.monthIncomesValue;
    dom.monthExpense.textContent = state.monthExpensesValue;
    dom.monthExpensePercent.textContent = `${parseInt(state.monthExpensesPercentage)}%`;
}

const valueFieldOnlyDecimalNumbers = (element) => {
    element.addEventListener('input', async e => {
        e.preventDefault();
        const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

        const arr = e.target.value.split('');
        const value = arr[arr.length - 1];

        let isAllowed = false;
        allowedChars.forEach(el => {
            if(el === value) {
                isAllowed = true;
            };
        });
        
        if(isAllowed === false) arr.pop();
        
        e.target.value = arr.join('');
    });
}

const changeInputBorders = (value) => {
    if(value === '+') {
        dom.root.style.setProperty('--color-inputs', '#0d66a1');
    }else if(value === '-') {
        dom.root.style.setProperty('--color-inputs', '#ee2727');
    }
}

const clearInputs = () => {
    dom.inputDescription.value = '';
    dom.inputValue.value = '';
}

const addItemHoverClass = (e) => {
    console.log(e.currentTarget);
}

const Views = {
    initView: initView,
    addNewItemToDOM: addNewItemToDOM,
    removeDomItem: removeDomItem,
    updateState: updateState,
    valueFieldOnlyDecimalNumbers: valueFieldOnlyDecimalNumbers,
    changeInputBorders: changeInputBorders,
    clearInputs: clearInputs,
    addItemHoverClass: addItemHoverClass
}

export default Views;