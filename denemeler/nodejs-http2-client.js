import http2 from 'http2';

(async () => {
  try {
    // Bir tünel için HTTP/1.1 CONNECT isteği oluştur:
    const client = http2.connect('http://192.168.13.71:8207');
    client
      .on('error', (err) => console.error(err))
      .on('connect', (res, socket) => { console.error(res) });

    /* İstemciyi kullan */
    const postbody = 'afId=Netflix&grant_type=client_credentials&scope=3gpp-monitoring-event';
    const headers = {
      ':method': 'POST',
      ':path': '/oauth2/token',
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': Buffer.byteLength(postbody),
    };

    /* İstek yap */
    const req = client.request(headers);

    req
      .on('error', (err) => {
        console.error('HTTP/2 isteği hatası:', err);
      })
      .on('response', (headers, flags) => {
        console.log('HTTP/2 yanıt başlıkları:', headers);
      })
      .on('data', (chunk) => {
        console.log('HTTP/2 yanıt parçası:', chunk);
      })
      .on('end', () => {
        client.close();
      });

    req.setEncoding('utf8');
    req.write(postbody);
    req.end();

  } catch (error) {
    console.error(error);
  }
})();
