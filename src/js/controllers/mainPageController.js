import dom, {initDOM, refreshDOM, refreshAddNewItemPopupDOM} from './../utils/dom.js';
// import State from './utils/state.js';
import Model from './../models/model.js';
import Views from './../views/views.js';
import {mainPage} from './../utils/pages.js';



const initMainPage = (firebase) => {
    window.history.pushState({}, 'Budget App', '/');
    document.getElementById('root').innerHTML = mainPage;
    initDOM();

    const state = Model.initState();
    Views.initView(state);
    controller(firebase);
    addEventListenersToNewListItems();
}

const controller = (firebase) => {
    dom.incomeBtn.addEventListener('click', activateAddNewItemPopup);
    dom.expenseBtn.addEventListener('click', activateAddNewItemPopup);
    dom.logOutBtn.addEventListener('click', e => {
        e.preventDefault();
        firebase.auth().signOut();
    })
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
        const input = {
            type: e.currentTarget.dataset.type,
            description: dom.addNewItemPopup.inputDescription.textContent,
            value: dom.addNewItemPopup.inputValue.textContent,
        };

        dom.addNewItemPopup.radioBtns.forEach(radio => {
            if(radio.checked) input.name = radio.id;
        });

        // console.log(input);

        // create new income / expense
        Model.createNewEntry(input);

        // add event listener for the new elements inserted
        addEventListenersToNewListItems();

        // close popup
        Views.closeAddNewItemPopup();
    });


}


export default initMainPage;