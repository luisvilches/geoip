const app = require('express')();

const { geoIpMiddleware } = require('./geoip');

app.use(geoIpMiddleware);

app.get("/", (req, res) => {
    res.json({ infoRequest: req.geoip });
});

app.listen(process.env.PORT || 5000, () => console.log('listen'));