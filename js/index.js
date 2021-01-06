import dom, {refreshDOM} from './utils/dom.js';
// import State from './utils/state.js';
import Model from './models/model.js';
import Views from './views/views.js';

const initApp = () => {
    const state = Model.initState();
    Views.initView(state);
}

const addEventListenersToNewListItems = () => {
    dom.listsItems.forEach(item => item.addEventListener('click', Views.addItemHoverClass));

    dom.deleteListItem.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const element = e.currentTarget.parentElement.parentElement;

            Views.removeDomItem(element);
            Model.deleteItemFromState(element.dataset.type, element.dataset.id);

        });
    });
}

const controller = () => {
    // let user introduce only decimal numbers in the value field
    Views.valueFieldOnlyDecimalNumbers(dom.inputValue);

    // listener when user choose the type of entry (+ or -)
    dom.inputType.addEventListener('change', e => {
        e.preventDefault();
        //change the borders of inputs
        Views.changeInputBorders(e.target.value);
    });

    // Form submited
    dom.addItemForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = {
            type: dom.inputType.value,
            name: dom.inputName.value,
            description: dom.inputDescription.value,
            value: dom.inputValue.value
        }

        // create new income / expense
        Model.createNewEntry(input);

        // add event listener for the new elements inserted
        addEventListenersToNewListItems();
    });






    /** Only visual looking page */



}

initApp();
controller();
addEventListenersToNewListItems();