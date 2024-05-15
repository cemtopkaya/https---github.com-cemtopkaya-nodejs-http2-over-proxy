// tls Modülüyle sertifika bilgisini göreceğim
import url from 'url'; // URL modülü
import tls from 'tls'; // TLS modülü
import { HttpProxyAgent } from 'http-proxy-agent'; 


// --------------- Vekil Sunucu Ayarları --------------- \\
// Proxy sunucu bilgileri
const PROXY_HOST = '192.168.188.36'; // Proxy sunucu adresi veya IP adresi
const PROXY_PORT = 888; // HTTPS Proxy sunucu portu
const PROXY_PROTOCOL = 'https:'; // HTTPS protokolü

// Proxy ayarları
const proxyOptions = {
  hostname: PROXY_HOST, // Proxy'nin IP adresi
  port: PROXY_PORT, // Proxy'nin port numarası
  protocol: PROXY_PROTOCOL, // Proxy'nin protokolü (http veya https)
};
// Proxy için HttpProxyAgent oluştur
const proxyAgent = new HttpProxyAgent(proxyOptions);

// --------------- Sertifikayı çekelim ------------------- \\
// Hedef URL
const targetUrl = 'https://example.com';
// URL'yi ayrıştırma
const urlParts = url.parse(targetUrl);
// HTTPS istek seçenekleri
const options = {
  hostname: urlParts.hostname,
  path: urlParts.path,
  // HTTPS varsayılan olarak 443 portu kullanır
  port: urlParts.port || 443, 
  // İstek yöntemi (GET, POST, vb.)
  method: 'GET', 
  agent: proxyAgent, // Proxy ajanı ekleme
};

// SSL/TLS sertifikasını görüntüleme
const tlsSocket = tls.connect(options.port, options.hostname, {
  servername: options.hostname,
  rejectUnauthorized: options.rejectUnauthorized,
  // Proxy için ek ayarlar
  agent: proxyAgent
}, () => {
  const peerCertificate = tlsSocket.getPeerCertificate();
  console.log(peerCertificate);
  tlsSocket.end();
});

// Hata durumlarını ele alma
tlsSocket.on('error', (err) => {
  console.error('Sertifika Hatası:', err);
});