import http from 'http'; // HTTP modülü
import url from 'url'; // URL modülü

// Hedef URL
const targetUrl = 'http://example.com:80';

// URL'yi ayrıştırma
const urlParts = url.parse(targetUrl);

// İstek seçenekleri
const options = {
  hostname: urlParts.hostname,
  path: urlParts.path,
  port: urlParts.port, // http isteği 80 portundan gidecek
  method: 'GET', // İstek yöntemi (GET, POST, vb.)
};

// HTTP istek yapiyoruz
const req = http.request(options, (res) => {
  // Yanıt durumu kodunu yazdırma
  console.log(`Yanıt Durumu Kodu: ${res.statusCode}`);

  // Başlıkları yazdırma
  console.log('Başlıklar:');
  const headers = res.headers;
  for (const key in headers) {
    console.log(`${key}: ${headers[key]}`);
  }
  // Çıktı akışı (stream) zaten mevcuttur, direkt olarak okuma yapabilirsiniz
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  // Hata durumlarını ele alma
  res.on('error', (err) => {
    console.error('Hata:', err);
  });

  // Çıktı akışı tamamlandığında mesaj yazdırma
  res.on('end', () => {
    console.log('Yanıt Alındı.');
  });
});

// Hata durumlarını ele alma
req.on('error', (err) => {
  console.error('İstek Sırasında Hata:', err);
});

// İsteği gönderme
req.end();




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
      .on('connect', (res, socket) => { 
        console.log(res);
        client.close();
      });

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
