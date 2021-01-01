import dom, {refreshDOM} from './utils/dom.js';
// import State from './utils/state.js';
import Model from './models/model.js';
import Views from './views/views.js';

const initApp = () => {
    const state = Model.initState();
    Views.initView(state);
}

const addEventListenersToNewListItems = () => {
    dom.deleteListItem.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const element = e.currentTarget.parentElement.parentElement;
            console.log(element);
            Views.removeDomItem(element);
            Model.deleteItemFromState(element.dataset.type, element.dataset.id);

        });
    });
}

const controller = () => {
    Views.valueFieldOnlyDecimalNumbers(dom.inputValue);

    dom.inputType.addEventListener('change', e => {
        e.preventDefault();
        Views.changeInputBorders(e.target.value);
    });

    dom.addItemForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = {
            type: dom.inputType.value,
            name: dom.inputName.value,
            description: dom.inputDescription.value,
            value: dom.inputValue.value
        }
        Model.createNewEntry(input);
        addEventListenersToNewListItems();
    });


}

initApp();
controller();
addEventListenersToNewListItems();