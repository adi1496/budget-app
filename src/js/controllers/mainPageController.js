import firebase from 'firebase/app';
import 'firebase/firestore';

import dom, {initDOM, refreshDOM, refreshAddNewItemPopupDOM} from './../utils/dom.js';

import Model from './../models/model.js';
import mainPageViews from './../views/views.js';
import {mainPage} from './../utils/pages.js';



const mainPageController = async () => {
    document.getElementById('root').innerHTML = mainPage;
    initDOM();

    const state = await Model.initState();
    console.log(state);
    mainPageViews.initView(state);
    controller();
    addEventListenersToNewListItems();
}

const controller = () => {
    dom.incomeBtn.addEventListener('click', activateAddNewItemPopup);
    dom.expenseBtn.addEventListener('click', activateAddNewItemPopup);
    dom.logOutBtn.addEventListener('click', e => {
        e.preventDefault();
        firebase.auth().signOut();
    });
}


// Add event listener to every new items added to the page (income or expese)
const addEventListenersToNewListItems = () => {
    dom.listsItems.forEach(item => item.addEventListener('click', mainPageViews.addItemHoverClass));

    dom.deleteListItem.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const element = e.currentTarget.parentElement.parentElement;

            mainPageViews.removeDomItem(element);
            Model.deleteItemFromState(element.dataset.type, element.dataset.id);

        });
    });
}




/**************** LISTENERS CALLBACK FUNCTIONS **********************/ 

// activate ADD NEW ITEM POPUP
function activateAddNewItemPopup(event) {
    event.preventDefault();
    mainPageViews.showAddNewItemPopup(event);
    refreshAddNewItemPopupDOM();

    // allow only numbers and math symbols in the value input (popup)
    mainPageViews.allowOnlyNumbersAndMathSymbols(dom.addNewItemPopup.inputValue);
    dom.addNewItemPopup.inputDescription.addEventListener('input', e => {
        if(dom.addNewItemPopup.descriptionBoxPlaceholder.style.visibility !== 'hidden'){
            dom.addNewItemPopup.descriptionBoxPlaceholder.style.visibility = 'hidden';
        }
    });

    // when select a type of income/expense change the style on page
    dom.addNewItemPopup.radioBtns.forEach(radioBtn => {
        radioBtn.addEventListener('change', mainPageViews.selectCategory);
    })

    // close the popup with cancel button
    dom.addNewItemPopup.cancelBtn.addEventListener('click', e => {
        e.preventDefault();
        
        mainPageViews.closeAddNewItemPopup();
    });

    // when submit the popup
    dom.addNewItemPopup.submitBtn.addEventListener('click', e => {
        e.preventDefault();
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
        mainPageViews.closeAddNewItemPopup();
    });


}


export default mainPageController;