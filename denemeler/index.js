//Use the default
const {request} = require('http2-client');
//Make a request




const h2Target = '';
const req = request(h2Target, (res)=>{
  console.log(`
Url : ${h2Target}
Status : ${res.statusCode}
HttpVersion : ${res.httpVersion}
  `);
});
req.end();

//Alternatively create a new request
const {HttpRequestManager} = require('http2-client');
const httpRequestManager = new HttpRequestManager();
//Make a request
const req = httpRequestManager.request(/*....*/);
req.end();