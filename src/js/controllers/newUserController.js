import {newUserPage} from './../utils/pages.js';

const newUserPageController = (firebase, userId) => {
    document.getElementById('root').innerHTML = newUserPage;

    document.getElementById('ok-btn').addEventListener('click', e => {
        e.preventDefault();

        const curency = document.getElementById('curency').value;
        firebase.firestore().collection('users').doc(userId).update({
            curency: curency
        });

        const user = {
            userId: userId,
            curency: curency
        }
        window.localStorage.removeItem('isNewUser');
        window.localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
    });
}




export default newUserPageController;