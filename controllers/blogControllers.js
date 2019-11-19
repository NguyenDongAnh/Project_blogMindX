var firebase = require('firebase');
db = firebase.firestore();

exports.saveArticle = function(req, res, next) {
    db.collection("conversations").doc().set({
        author: req.session.email,
        article_title: req.body.title,
        article: req.body.article,
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

exports.articleUser = async function(req, res, next) {
    console.log(email);
    res.send(email);
}