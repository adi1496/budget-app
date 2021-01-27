import dom, {refreshDOM, refreshAddNewItemPopupDOM} from './utils/dom.js';
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
    dom.incomeBtn.addEventListener('click', activateAddNewItemPopup);
    dom.expenseBtn.addEventListener('click', activateAddNewItemPopup);
    // let user introduce only decimal numbers in the value field
    // Views.valueFieldOnlyDecimalNumbers(dom.inputValue);

    // listener when user choose the type of entry (+ or -)
    // dom.inputType.addEventListener('change', e => {
    //     e.preventDefault();
    //     //change the borders of inputs
    //     Views.changeInputBorders(e.target.value);
    // });

    // Form submited
    // dom.addItemForm.addEventListener('submit', e => {
    //     e.preventDefault();
    //     const input = {
    //         type: dom.inputType.value,
    //         name: dom.inputName.value,
    //         description: dom.inputDescription.value,
    //         value: dom.inputValue.value
    //     }

    //     // create new income / expense
    //     Model.createNewEntry(input);

    //     // add event listener for the new elements inserted
    //     addEventListenersToNewListItems();
    // });



    /** Only visual looking page */



}

initApp();
controller();
addEventListenersToNewListItems();




/**************** LISTENERS CALLBACK FUNCTIONS **********************/ 

// activate ADD NEW ITEM POPUP
function activateAddNewItemPopup(event) {
    event.preventDefault();
    Views.showAddNewItemPopup(event);
    refreshAddNewItemPopupDOM();

    Views.allowOnlyNumbersAndMathSymbols(dom.addNewItemPopup.inputValue);
    dom.addNewItemPopup.inputDescription.addEventListener('input', e => {
        if(dom.addNewItemPopup.descriptionBoxPlaceholder.style.visibility !== 'hidden'){
            dom.addNewItemPopup.descriptionBoxPlaceholder.style.visibility = 'hidden';
        }
    });


    dom.addNewItemPopup.radioBtns.forEach(radioBtn => {
        radioBtn.addEventListener('change', Views.selectCategory);
    })

    dom.addNewItemPopup.cancelBtn.addEventListener('click', e => {
        e.preventDefault();
        
        Views.closeAddNewItemPopup();
    });

    dom.addNewItemPopup.submitBtn.addEventListener('click', e => {
        e.preventDefault();
    });

    dom.addNewItemPopup.submitBtn.addEventListener('click', e => {
        const input = {
            type: e.currentTarget.dataset.type,
            description: dom.addNewItemPopup.inputDescription.textContent,
            value: dom.addNewItemPopup.inputValue.textContent,
        };

        dom.addNewItemPopup.radioBtns.forEach(radio => {
            if(radio.checked) input.name = radio.id;
        });

        console.log(input);

        // create new income / expense
        Model.createNewEntry(input);

        // add event listener for the new elements inserted
        addEventListenersToNewListItems();

        // close popup
        Views.closeAddNewItemPopup();
    });


}