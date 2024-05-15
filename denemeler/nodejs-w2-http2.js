/**
 * Öncesinde `ssh -D 6000 ubuntu@192.168.13.71` bir terminalde açılmalı
 */
// const http2 = require('node:http2');
import http2 from 'node:http2';
import { SocksProxyAgent } from 'socks-proxy-agent';

(async () => {
  try {
    // Build a HTTP/1.1 CONNECT request for a tunnel:
    // const client = http2.connect('http://192.168.13.71:8207');
    const client = http2.connect('http://10.10.23.53:8207', {
    // const client = http2.connect('http://192.168.13.71:8207', {
      agent:
      // createConnection: () => {
        // return new SocksProxyAgent({
        new SocksProxyAgent({
          protocol: 'socks5',
          hostname: 'localhost',
          port: 6000,
          username: null,
          password: null
        })
      // }
    });
    
    client
      .on('error', (err) => console.error(err))
      .on('connect', (res, socket) => { 
        console.log(res);
        client.close();
      });

  } catch (error) {
    console.error(error);
  }
})();