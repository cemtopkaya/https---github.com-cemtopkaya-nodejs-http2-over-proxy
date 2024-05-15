/**
 * Öncesinde `ssh -D 6000 ubuntu@192.168.13.71` bir terminalde açılmalı
 */

import got from 'got';
import { SocksProxyAgent } from 'socks-proxy-agent';

const proxyOptions = {
  protocol: 'socks5',
  hostname: 'localhost',
  port: 6000,
  username: null,
  password: null
};

let agent = {
  // HTTP request
  http2: new SocksProxyAgent(proxyOptions, { tunnel: true, timeout: 5000 })
};

const postData = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event'
const options = {
  hostname: 'http://10.10.23.53',
  port: 8207,
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
    const response = await got.get(options);
    console.log(response.body);
  } catch (error) {
    console.error(error);
  }
})();
