const app = require('express')();
const expressip = require('express-ip');
var os = require('os');
const IP2Region = require('ip2region-id');
app.use(expressip().getIpInfoMiddleware);

const a = () => {
    return new Promise((resolve, reject) => {
        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    resolve(address.address)
                }
            }
        }
    })
}

app.get("/", (req, res) => {
    a().then(ip => {
        const query = new IP2Region();
        const res1 = query.search(ip);
        res.json({ ipRgion: res1, info: req.ipInfo });

    })
});




app.listen(5000, () => console.log('listen'));