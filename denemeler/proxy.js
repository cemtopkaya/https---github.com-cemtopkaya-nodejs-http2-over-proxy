import http2 from 'http2';
import url from 'url'; // URL modülü
import { HttpProxyAgent } from 'http-proxy-agent'; // Dikkat: { HttpProxyAgent }

// Proxy sunucu bilgileri
const PROXY_HOST = '192.168.188.36'; // Proxy sunucu adresi veya IP adresi
const PROXY_PORT = 777; // Proxy sunucu portu
const PROXY_PROTOCOL = 'http:'; // Proxy sunucu protokolü

// Proxy ayarları
const proxyOptions = {
    hostname: PROXY_HOST, // Proxy'nin IP adresi
    port: PROXY_PORT, // Proxy'nin port numarası
    protocol: PROXY_PROTOCOL, // Proxy'nin protokolü (http veya https)
};

// Proxy için HttpProxyAgent oluştur
const proxyAgent = new HttpProxyAgent(proxyOptions);

// Hedef URL
// const targetUrl = 'https://www.turkiye.gov.tr';
const targetUrl = 'http://10.10.23.53:8207';
const payload = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event'

// Hedef sunucu URL'sinin ayrıştırılması
const targetUrlParts = url.parse(targetUrl);
// HTTP/2 istemcisini oluştur
const client = http2.connect(targetUrl, { agent: proxyAgent });

client.on('error', console.error)

// Hedef sunucuya bağlanma
const req = client.request({
    ':method': 'POST',
    ':path': targetUrlParts.href,
    'host': targetUrlParts.host,
});

// İstek tamamlandığında yanıtı işle
req.on('response', (headers, flags) => {
    console.log('HTTP/2 İstek Gönderildi, Yanıt Alındı:');
    console.log('Başlıklar:', headers);
    console.log('Flags:', flags);
});

// Yanıtın içeriğini al
let data = '';
req.on('data', (chunk) => {
    data += chunk;
});

// Yanıt tamamlandığında işle
req.on('end', () => {
    console.log('Yanıt İçeriği:', data);
});

// Hata durumlarını ele al
req.on('error', (err) => {
    console.error('İstek Sırasında Hata Oluştu:', err);
});

// İstek gövdesini yaz
req.write(payload);
req.end();
