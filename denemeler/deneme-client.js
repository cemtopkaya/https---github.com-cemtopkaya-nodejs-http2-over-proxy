const http2 = require('http2-client');
const fs = require('fs');

// POST isteği göndereceğimiz URL
const url = 'http://10.10.23.53:8207';

// Gönderilecek payload verisi
const payload1 = {
  key1: 'value1',
  key2: 'value2'
};
const payload = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event'

// HTTP/2 isteği gönderme fonksiyonu
async function sendPostRequest() {
    try {
        const client = new http2.Client();
        await client.connect();
        
        const { response } = await client.post(url, {
            ':method': 'POST',
            ':path': '/oauth2/token',
            // 'content-type': 'application/json',
            ':scheme': 'http',
            // ':authority': 'api.example.com',
            ':protocol': 'HTTP/2.0',
            'content-length': Buffer.byteLength(JSON.stringify(payload))
        }, payload);

        // Yanıtı konsola yazdır
        console.log('Response:', response);

        await client.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

// POST isteği gönderme fonksiyonunu çağır
sendPostRequest();
