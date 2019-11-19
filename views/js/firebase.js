var firebaseConfig = {
    apiKey: "AIzaSyCDy2HQ9JY6Sonus39uFt1tVGLBpKAPNPQ",
    authDomain: "donganhmindx-cijs33.firebaseapp.com",
    databaseURL: "https://donganhmindx-cijs33.firebaseio.com",
    projectId: "donganhmindx-cijs33",
    storageBucket: "donganhmindx-cijs33.appspot.com",
    messagingSenderId: "280586827980",
    appId: "1:280586827980:web:3865f46a3718daf8836a69",
    measurementId: "G-GGHB08MXF9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();