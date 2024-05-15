import got from 'got';
// import SocksProxyAgent from 'simple-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
// const { SocksProxyAgent } = require('socks-proxy-agent');
// const SocksProxyAgent = require('socks-proxy-agent');
// const SocksProxyAgent = require('simple-proxy-agent');

// let agent = new SocksProxyAgent('socks5://localhost:6000', {
//   // Options, with all defaults
//   tunnel: true, // If true, will tunnel all HTTPS using CONNECT method
//   timeout: 5000, // Time in milli-seconds, to maximum wait for proxy connection to establish
// });

// let agent = {
//   http: new SocksProxyAgent('socks://localhost:6000', {
//     tunnel: true,
//     timeout: 5000
//   })
// };
// agent = socks.createAgent({proxyHost:"localhost", proxyPort:6000});
// agent = new SocksProxyAgent({proxyHost:"localhost", proxyPort:6000});



import socks from 'socks'
const proxyOptions = {
  protocol: 'socks5',
  hostname: 'localhost',
  port: 6000,
  // Optional: Username and password for authenticated proxy
  username: null,
  password: null
};
// agent = new SocksProxyAgent('socks://localhost:6000', {
//   tunnel: true,
//   timeout: 5000
// })
let agent = {
  http: new SocksProxyAgent(proxyOptions,{tunnel: true, timeout: 5000})
};

const options = {
  url: 'http://10.10.23.53:81', // HTTP request
  agent: agent
  // agent: {
  //   http: new SocksProxyAgent('socks4://localhost:5000', {
  //     tunnel: true,
  //     timeout: 5000
  //   })
  // }
};

(async () => {
  try {
    const response = await got.get(options);
    console.log(response.body);
  } catch (error) {
    console.error(error);
  }
})();
