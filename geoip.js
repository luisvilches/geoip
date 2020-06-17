const gip = require('geoip-lite');

const geoip = ip => {
    if (ip.includes('::ffff:')) ip = ip.split(':').reverse()[0];
    const c = gip.lookup(ip);
    if ((ip === '127.0.0.1' || ip === '::1')) return { error: "Error no es una ip valida" }
    if (!c) return { error: "Ocurrió un error al intentar procesar la información" }
    return c;
}

const geoIpMiddleware = (req,res,next) => {
    let xff = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
    let ip = xff || req.connection.remoteAddress;
    req.geoip = { ip, ...geoip(ip) };
    next();
}

module.exports = {
    geoIpMiddleware,
    geoip,
}