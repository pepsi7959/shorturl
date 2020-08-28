const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

const auth = require('./components/v1/auth');
const shortUrl = require('./components/v1/shorturl');

app.use(express.json())
app.use(cors({origin: true}));

app.use('/v1/auth', auth);
app.use('/v1/shorturl', shortUrl);
app.get('/v1/ping', (req, res) => {
  res.send("ok");
});

exports.api = functions.https.onRequest(app);
