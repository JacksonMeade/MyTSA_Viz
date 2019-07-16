//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        db.collection('').get().then(snapshot => {
            //setupGuides(snapshot.docs);
        });
    } else {
        //user logged out
        //setupGuides([]);
    }
});

//sign up
const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupform['signup-email'].value;
    const password = signupform['signup-password'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //What do do once logged in
        logUI();
    });


});

//log out method 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
});

//log in method
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // What to do once logged in
        logUI();
    });
});

function logUI() {

}