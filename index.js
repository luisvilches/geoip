const app = require('express')();
const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);
app.get("/", (req, res) => {
    res.json({ infoRequest: req.ipInfo });
});
app.listen(process.env.PORT || 5000, () => console.log('listen'));