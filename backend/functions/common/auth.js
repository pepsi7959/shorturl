// MIT License

// Copyright 2019-present, NarongsaK Mala <narongsak.mala@gmail.com>

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const http = require('./http');
const jwt = require('jsonwebtoken');


function getTokenFromHeader(req) {

    if( req.headers.authorization === undefined) {
        return undefined;
    }

    const token = req.headers.authorization.substring(7);

    return token;
}

function isLogin(req, res, next){

    const token = getTokenFromHeader(req);

    if( token === undefined ) {
        http.error(res, 401, 401000,'unauthorized');
        return;
    }

    console.log(`token: ${token}`);

    try{
        verifyToken(token);
        if( next !== undefined )
            return next();
    } catch( err ) {
        console.log(err);
        http.error(res, 401, 401000,'invalid token');
        return;
    }
  
}

function getToken(data) {

    var privateKey = "598A2C3C3A0F179D486784AE34CD95438392A494A264981F41432DED50B57DB3";
    
    const payload = {
        exp: (Math.floor(Date.now() / 1000) + parseInt(3600)),
        data: data
    }
    
    return jwt.sign(payload, privateKey, {algorithm: 'HS256' });
}


function verifyToken( token ) {
    
    var publicKey = "598A2C3C3A0F179D486784AE34CD95438392A494A264981F41432DED50B57DB3";
    
    return jwt.verify(token, publicKey, {algorithm: 'HS256' });
}

function getClaims( req ) {

    const token = getTokenFromHeader(req);

    try{
        return verifyToken(token);
    } catch( err ) {
        return undefined;
    } 
}

module.exports = {
    isLogin,
    getToken,
    verifyToken,
    getClaims,
    getTokenFromHeader
}