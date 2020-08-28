"use strict";

// Core Functions
const express = require('express');
const http = require('../../../common/http');
const auth = require('../../../common/auth');
const bijective = require('./bijective');
const urlencode = require('urlencode');
const {
    getFirestore
} = require('../../../common/firestore');
const {
    firestore
} = require('firebase-admin');
const router = express.Router();

const HTTP_ERR = http.HTTP_ERROR_CODES;

//  1 - 52              diamon      1 digit
//  53 - 2653           platinum    2 digits
//  2654 - 135304       gold        3 digits
//  135305 - 6900505    silver      4 digits
//  6900506             bronze      5 digits

const DIAMON_ID = 1
const PLATINUM_ID = 53
const GOLD_ID = 2654
const SILVER_ID = 135305
const BRONZE_ID = 6900506

async function getShortURL(req, res) {

    let originUrl, shortUrl;

    if (req.query.originUrl === undefined) {
        http.error(res, 400, HTTP_ERR.E400_RequiredField.code, HTTP_ERR.E400_RequiredField.desc + ': originUrl');
        return;
    } else {
        originUrl = urlencode(req.query.originUrl);
    }

    const db = getFirestore();
    const ref = db.collection('url');
    const url = await ref.where('long', '==', originUrl).get();

    if (url.empty) {

        const maxId = await ref.orderBy('id', 'desc').limit(1).get();
        let id = 0;

        maxId.forEach(doc => {
            console.log(doc.id);
            id = doc.data().id + 1;
        });

        shortUrl = bijective.encode(id);

        if (id > 0) {
            let data = {
                id: id,
                long: originUrl,
                short: shortUrl
            };
            const add_status = await db.collection('url').doc(`${id}`).set(data);
        } else {
            http.error(res, 500, HTTP_ERR.E500_ServerError.code, HTTP_ERR.E500_ServerError.desc + ' storing url failed');
            return;
        }
    } else {
        url.forEach(doc => {
            shortUrl = doc.data().short;
        })

    }

    http.success(res, {
        originUrl: urlencode.decode(originUrl),
        shortUrl: shortUrl
    });

}

async function getLongURL(req, res) {

    let originUrl, shortUrl;

    if (req.query.shortUrl === undefined) {
        http.error(res, 400, HTTP_ERR.E400_RequiredField.code, HTTP_ERR.E400_RequiredField.desc + ': shortUrl');
        return;
    } else {
        shortUrl = req.query.shortUrl;
    }

    const id = bijective.decode(shortUrl);
    const db = getFirestore();
    const ref = db.collection('url').doc(`${id}`);
    const url = await ref.get();
   
    if (!url.exists) {
        http.error(res, 404, HTTP_ERR.E404_NotFound.code, HTTP_ERR.E404_NotFound.desc);
        return;
    }

    http.success(res, {
        originUrl: urlencode.decode(url.data().long),
        shortUrl: shortUrl
    });

}

router.get('/resolve', getLongURL);
router.get('/', getShortURL);

module.exports = router