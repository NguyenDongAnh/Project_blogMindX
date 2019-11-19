var firebase = require('firebase');
exports.loginAuth = async function(req, res, next) {
    try {
        var result = await login(req.body.email, req.body.password);
        if (result === true) {
            return true;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}
async function login(email, password) {
    if (!validateEmail(email)) {
        throw Error("Not a valid email")
    }
    if (password === "") {
        throw Error("Not a valid password")
    }
    const loginResult = await firebase.auth().signInWithEmailAndPassword(email, password);
    if (!loginResult.user.emailVerified) {
        throw Error("Email not Verified");
    }
    return true;
}
exports.registerAuth = async function(req, res, next) {
    try {
        var result = await register(req.body.email, req.body.password, req.body.repassword);
        if (result === true) {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
}
async function register(email, password, repassword) {
    if (!validateEmail(email)) {
        throw Error("Not a valid email")
    }
    if (password.length < 8) {
        throw Error("Password's length must be greater than 8 ")
    }
    if (password !== repassword) {
        throw Error("Passwor not matched");
    }
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.sendEmailVerification();
    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}