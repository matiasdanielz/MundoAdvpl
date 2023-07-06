const PROXY_CONFIG = {
    "/api": {
        "target": "https://192.168.1.157:1234/app-root",
        "secure": false,
        "bypass": function(req, res, proxyOptions){
            req.headers["Authorization" = "Basic YWRtaW46IA=="];
        }
    }
}

module.exports = PROXY_CONFIG