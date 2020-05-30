const wxRequest = require("./wxRequest")

let banner = () => wxRequest.get("/banner/json");

let topArticles = () => wxRequest.get("/article/top/json")

let homeArticles = (page) => wxRequest.get(`/article/list/${page}/json`)

module.exports = {
    banner: banner,
    topArticles: topArticles,
    homeArticles: homeArticles
}