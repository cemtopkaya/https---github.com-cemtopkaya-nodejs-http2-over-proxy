const http2 = require('http2-wrapper');
// const socks = require('socks');
// const SocksClient = require('socks').SocksClient;

// SOCKS proxy adresinde Proxy agent oluştur
// const SocksProxyAgent = require('socks-proxy-agent');
const SocksProxyAgent = require('simple-proxy-agent');
let agent = new SocksProxyAgent('socks5://localhost:6000', {
  // Options, with all defaults
  tunnel: true, // If true, will tunnel all HTTPS using CONNECT method
  timeout: 5000, // Time in milli-seconds, to maximum wait for proxy connection to establish
});

const wrapper = require('socks-wrapper');
agent = new wrapper.HttpAgent(6000, 'localhost');
// const proxyOptions = {host:"localhost",port:6000};
// const agent = new socks.Agent(proxyOptions);

const url = "http://10.10.23.53:8207/oauth2/token"
// POST isteği için gerekli bilgileri hazırla
const postData = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event'


const options = {
  hostname: 'http://10.10.23.53:8207',
  port: 443,
  path: '/oauth2/token',
  method: 'POST',
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  },
  // timeout:10,
  agent // Proxy agent'ı kullan
};


(async () => {
  try {
    // HTTP/2 isteği gönder
    const req = await http2.request(options, response => {
			console.log('statusCode:', response.statusCode);
			console.log('headers:', response.headers);

			const body = [];
			response.on('data', chunk => body.push(chunk));
			response.on('end', () => {
				console.log('body:', Buffer.concat(body).toString());
			});
		});

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });

    // Veriyi isteğe ekleyerek gönder
    req.write(postData);
    req.end();
  } catch (error) {
    console.error(error);
  }
})();
