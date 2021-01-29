import {loginPage, signupPage} from './../utils/pages.js';

const initAuthController = (firebase) => {
    controller(firebase, 'login');
}

const controller = (firebase, page) => {
    if(page === 'login') {
        window.history.pushState({}, 'login', '/login');
        document.getElementById('root').innerHTML = loginPage;
        loadLoginPage(firebase);
    }else {
        window.history.pushState({}, 'signup', '/signup');
        document.getElementById('root').innerHTML = signupPage;
        loadSignUpPage(firebase);
    }
    
}


function loadLoginPage(firebase) {
    const dom = {
        title: document.getElementById('title'),
        loginBtn: document.getElementById('login-btn'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        toSignUp: document.getElementById('to-signup')
    }

    dom.loginBtn.addEventListener('click', e => {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(dom.email.value, dom.password.value)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential);
            // ...
        })
        .catch((error) => {
            const err = document.createElement('div');
            err.classList.add('error');
            err.textContent = error.message;
            dom.title.insertAdjacentElement('afterend', err);
            console.log(error);
        });
    });

    dom.toSignUp.addEventListener('click', e => {
        e.preventDefault();

        controller(firebase, 'signup');
    })
}


function loadSignUpPage(firebase) {
    const dom = {
        title: document.getElementById('title'),
        signUpBtn: document.getElementById('sign-up-btn'),
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        passwordConfirm: document.getElementById('password-confirm'),
        toLogin: document.getElementById('to-login')
    }

    dom.signUpBtn.addEventListener('click', e => {
        e.preventDefault();
        if(dom.password.value !== dom.passwordConfirm.value){
            const error = document.createElement('div');
            error.classList.add('error');
            error.textContent = 'Passwords are not the same';
            dom.title.insertAdjacentElement('afterend', error);
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(dom.email.value, dom.password.value)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential.user.uid);
            firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                name: dom.name.value,
                email: dom.email.value,
                isNewUser: true
            });
            // ...
        })
        .catch((error) => {
            const err = document.createElement('div');
            err.classList.add('error');
            err.textContent = error.message;
            dom.title.insertAdjacentElement('afterend', err);
            console.log(error);
        });
    });

    dom.toLogin.addEventListener('click', e => {
        e.preventDefault();

        controller(firebase, 'login');
    })
}

export default initAuthController;