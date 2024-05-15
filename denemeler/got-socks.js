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
  http: new SocksProxyAgent(proxyOptions, { tunnel: true, timeout: 5000 })
};

const options = {
  url: 'http://10.10.23.53:81', // HTTP request
  agent: agent
};

(async () => {
  try {
    const response = await got.get(options);
    console.log(response.body);
  } catch (error) {
    console.error(error);
  }
})();
