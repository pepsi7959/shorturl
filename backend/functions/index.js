const functions = require('firebase-functions');


exports.getShortUrl = functions.https.onRequest((req, res) => {
  let originUrl = "";
  let shortUrl = "";
  functions.logger.info(req.query);
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3001' );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, userid, token');

  
  if( req.query.originUrl !== undefined ) {
    originUrl = req.query.originUrl;
  }

  shortUrl = "https://abit.ly/AbyXx";

  res.send({httpCode: 20000,
    data: {
      originUrl: originUrl,
      shortUrl: shortUrl
    }
  });
});
