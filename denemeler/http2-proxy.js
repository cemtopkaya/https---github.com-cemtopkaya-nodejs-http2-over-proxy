import http2 from 'http2'; // HTTP modülü
import http from 'http'; // HTTP modülü
import url from 'url'; // URL modülü



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






// Hedef URL ve Proxy URL
const targetUrl = 'http://10.10.23.53:8207';
const proxyUrl = 'http://192.168.188.36:777';

// Proxy ayarları
const proxyOptions = {
  hostname: '192.168.188.36', //'your-proxy-hostname',
  port: '888', //'proxy-port',
  headers: {
    Host: '10.10.23.53' // Hedef URL'nin hostname'i
  }
};

// HTTP/2 isteği oluşturma
const client = http2.connect(proxyUrl, proxyOptions);

client.on('error', (err) => {
  console.error(err);
});

const req = client.request({
  ':method': 'POST',
  ':path': targetUrl,
  'content-type': 'application/x-www-form-urlencoded'
});

// Gönderilecek veri
const postData = 'param1=value1&param2=value2';

req.setEncoding('utf8');
req.write(postData);

req.on('response', (headers, flags) => {
  console.log(headers);
})
  .on('data', (chunk) => {
    console.log(chunk.toString());
  })
  .on('error', (chunk) => {
    console.error(chunk.toString());
  });

req.end();
