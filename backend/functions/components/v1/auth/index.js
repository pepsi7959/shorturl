"use strict";

// Core Functions
const express = require('express');
const http = require('../../../common/http');
const auth = require('../../../common/auth');
const passwordHash = require('password-hash');
const router = express.Router();
const {
    getFirestore
} = require('../../../common/firestore');

const HTTP_ERR = http.HTTP_ERROR_CODES;

async function login(req, res) {

    if (req.body.user === undefined) {
        http.error(res, 400, HTTP_ERR.E400_RequiredField.code, HTTP_ERR.E400_RequiredField.desc + ': user');
        return;
    }

    if (req.body.password === undefined) {
        http.error(res, 400, HTTP_ERR.E400_RequiredField.code, HTTP_ERR.E400_RequiredField.desc + ': password');
        return;
    }

    let db = getFirestore();
    const ref = db.collection('users').doc(req.body.user);
    const user = await ref.get();
    const userData = user.data();

    console.log(userData);

    if (userData !== undefined && userData.password !== undefined &&
        passwordHash.verify(req.body.password, userData.password)) {

        const token = auth.getToken({
            username: req.body.user
        })

        http.success(res, {
            token: token
        });
    } else {
        http.error(res, 500, 50001, `login failed`);
    }
}

router.post('/', login);

module.exports = router