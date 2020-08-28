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

const HTTP_ERROR_CODES = {
    E400_InvalidFormat: {
        code: 40000,
        desc: "bad request: invalid format "
    },
    E400_RequiredField:{
        code: 40001,
        desc: "bad request: required field was not found "
    },
    E400_OutOfRange:
    {
        code:40002,
        desc: "bad request: invalid expected value ",
    },

    E401_InvalidCredential:{
        code: 40101,
        desc: "unauthorized: access is denied due to invalid credentials "
    },
    E401_NotFoundUser: {
        code: 40102,
        desc: "unauthorized: not found the user "
    },
    E401_InvalidPassword: {
        code: 40103,
        desc: "unauthorized: invalid password "
    },
    E403_AlreadyExist: {
        code: 40301,
        desc: "already exists: "
    },

    E404_NotFound: {
        code: 40401,
        desc: "not found: "
    },

    E500_ServerError: {
        code: 50000,
        desc: "server error: "
    },
    E500_ConnFailed:
    {
        code: 50001,
        desc: "server error: failed to connect database"
    }
}


function success(res, data) {
    if (res === null) {
        return false;
    }
    res.status(200).json({
        success: true,
        code: 20000,
        desc: null,
        data: data
    });
    return true;
}

function error(res, httpCode, errorCode, desc) {
    if (res === null) {
        return false;
    }
    res.status(httpCode).json({
        success: false,
        code: errorCode,
        desc: desc,
        data: null
    });
    return true;
}

module.exports = {
    success,
    error,
    HTTP_ERROR_CODES
}