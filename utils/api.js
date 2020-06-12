const wxRequest = require("./wxRequest")

let banner = () => wxRequest.get("/banner/json");

let topArticles = () => wxRequest.get("/article/top/json")

let homeArticles = (page) => wxRequest.get(`/article/list/${page}/json`)

let wechatTree = () => wxRequest.get("/wxarticle/chapters/json")

// 某个分类下的文章
let articleList = (page, param) => wxRequest.get(`/article/list/${page}/json`, param)

module.exports = {
    banner: banner,
    topArticles: topArticles,
    homeArticles: homeArticles,
    wechatTree: wechatTree,
    articleList: articleList,
}