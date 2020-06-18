const wxRequest = require("./wxRequest")

let banner = () => wxRequest.get("/banner/json");

let topArticles = () => wxRequest.get("/article/top/json")

let homeArticles = (page) => wxRequest.get(`/article/list/${page}/json`)

let wechatTree = () => wxRequest.get("/wxarticle/chapters/json")

// 某个分类下的文章
let articleList = (page, param) => wxRequest.get(`/article/list/${page}/json`, param)

//项目分类列表
let projectTree = () => wxRequest.get("/project/tree/json")

//项目下的文章列表 分页
let projectList = (page, param) => wxRequest.get(`/project/list/${page}/json`, param)

//最新项目下的文章
let newProjectList = (page) => wxRequest.get(`/article/listproject/${page}/json`)

module.exports = {
    banner: banner,
    topArticles: topArticles,
    homeArticles: homeArticles,
    wechatTree: wechatTree,
    articleList: articleList,
    projectTree: projectTree,
    projectList: projectList,
    newProjectList: newProjectList
}