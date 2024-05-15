/**
 * Öncesinde `ssh -D 6000 ubuntu@192.168.13.71` bir terminalde açılmalı
 */
// const http2 = require('node:http2');
import http2 from 'node:http2';
import { SocksProxyAgent } from 'socks-proxy-agent';

(async () => {
  try {
    // Build a HTTP/1.1 CONNECT request for a tunnel:
    const client = http2.connect('https://10.10.23.53:8207', {
      createConnection: () => {
        return new SocksProxyAgent({
          protocol: 'socks5',
          hostname: 'localhost',
          port: 6000,
          username: null,
          password: null
        })
      }
    });
    
    client
      .on('error', (err) => console.error(err))
      .on('connect', (res, socket) => { console.error(res) });

    /* Use the client */
    const postbody = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event'
    const headers = {
      ':method': 'POST',
      ':path': '/oauth2/token',
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': postbody.length,
    }
    /* İstek yap */
    const req = client.request(headers);

    req
      .on('error', (err) => {
        console.error('HTTP/2 request error:', err);
      })
      .on('response', (headers, flags) => {
        console.log('HTTP/2 response headers:', headers);
      })
      .on('data', (chunk) => {
        console.log('HTTP/2 response chunk:', chunk);
      })
      .on('end', () => {
        client.close();
      })

    req.setEncoding('utf8');
    req.write(postbody);


  } catch (error) {
    console.error(error);
  }
})();
