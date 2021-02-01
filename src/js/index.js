//3rd party modules
// import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Own modules
import firebaseConfig from './utils/firebaseConfig.js';
import mainPageController from './controllers/mainPageController.js';
import authController from './controllers/authController.js';
import newUserPageController from './controllers/newUserController.js';

const initApp = () => {
    firebase.initializeApp(firebaseConfig);
    process.env.api = '123456789';
    console.log(process.env);

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log(user);
            // window.history.pushState({}, 'Budget App', '/');
            if(window.localStorage.getItem('isNewUser')){
                newUserPageController(firebase, user.uid);
            }else {
                mainPageController(firebase);
            }
        }else {
            console.log('no user');
            authController(firebase);
        }
    })
}

initApp();





