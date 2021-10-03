export default async function teste(req, res) {

    const fetch = require('node-fetch');
    const https = require('https');

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        });

    var requestOptions = {
        method: 'GET',
        agent: httpsAgent
    };
    
    const webapi = await fetch("https://localhost:44346/api/Produtos", requestOptions)

    const result = await webapi.json()

    console.log(result)
    res.json(result)
}