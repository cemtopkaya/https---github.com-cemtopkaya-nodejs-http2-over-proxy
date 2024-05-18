import http2 from 'http2';
import http from 'http';
import url from 'url';

// Proxy URL ve Hedef URL
const proxyUrl = 'http://192.168.188.36:777';
const targetUrl = 'http://10.10.23.53:8207/oauth2/token';

// Proxy ve Hedef URL'leri parse et
const proxy = url.parse(proxyUrl);
const target = url.parse(targetUrl);

// Proxy ayarları
const proxyOptions = {
  host: proxy.hostname,
  port: proxy.port,
  headers: {
    // 'Proxy-Authorization': `Basic ${auth}` // Kimlik doğrulaması gerekmiyorsa yoruma alınabilir
  }
};

// HTTP proxy üzerinden CONNECT yöntemiyle bir tünel oluşturuyoruz
const req = http.request({
  ...proxyOptions,
  method: 'CONNECT',
  path: `${target.hostname}:${target.port}` // Proxy'ye hedef sunucu bilgilerini veriyoruz
});

req.on('error', (err) => {
  console.error(`Proxy request error: ${err.message}`);
});

req.on('connect', (res, socket, head) => {
  if (res.statusCode !== 200) {
    console.error(`Proxy connection failed with status code: ${res.statusCode}`);
    return;
  }

  // HTTP/2 istemcisi oluşturma
  const client = http2.connect(`http://${target.hostname}:${target.port}`, {
    createConnection: () => socket
  });

  client.on('error', (err) => {
    console.error(err);
  });

  const payload = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event';

  // HTTP/2 POST isteği oluşturma
  const req2 = client.request({
    ':method': 'POST',
    ':path': target.path,
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': Buffer.byteLength(payload)
  });

  req2.setEncoding('utf8');
  req2.write(payload);

  req2.on('response', (headers, flags) => {
    console.log('Yanıt Başlıkları:', headers);

    req2.on('data', (chunk) => {
      console.log('Yanıt Verisi:', chunk.toString());
    });

    req2.on('end', () => {
      console.log('Yanıt Alındı.');
      client.close();
    });
  });

  req2.on('error', (err) => {
    console.error(`Server request error: ${err.message}`);
  });

  req2.end();
});

req.end();
