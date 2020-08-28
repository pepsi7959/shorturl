const admin = require('firebase-admin');

var _db;

function getFirestore() {
    if (_db === undefined) {
        admin.initializeApp();
        _db = admin.firestore();
        return _db;
    } else {
        return _db;
    }
}

module.exports = {
    getFirestore
}