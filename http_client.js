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
