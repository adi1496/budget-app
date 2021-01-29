//3rd party modules
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Own modules
import firebaseConfig from './utils/firebaseConfig.js';
import mainPage from './controllers/mainPageController.js';
import authController from './controllers/authController.js';

const initApp = () => {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log(user);
            mainPage(firebase);
        }else {
            console.log('no user');
            authController(firebase);
        }
    })
}

initApp();





