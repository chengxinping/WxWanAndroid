//index.js

let api = require("../../utils/api.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bannerIndex: 0,
		articleList: {
			datas: [],
			curPage: 0,
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getBanner()
		this.getTopArticles()
	},


	//获取banner
	getBanner: function () {
		api.banner()
			.then(data => {
				this.setData({
					bannerList: data
				})
			})
	},

	//获取置顶文章

	getTopArticles: function () {
		api.topArticles().then(topArticles => {
			let length = topArticles.length
			for (var i = 0; i < length; i++) {
				topArticles[i].isTop = true
			}
			this.data.articleList.datas.push(...topArticles)
		})
		this.getArticles()
	},

	//获取文章列表
	getArticles: function () {
		let curPage = this.data.articleList.curPage
		api.homeArticles(curPage).then(data => {
			this.data.articleList.datas.push(...data.datas)
			this.data.articleList.curPage = data.curPage
			this.data.articleList.pageCount = data.pageCount
			this.setData({
				articleList: this.data.articleList
			})
			wx.stopPullDownRefresh()
		})
	},

	//banner滑动监听
	bannerChange: function (event) {
		this.setData({
			bannerIndex: event.detail.current
		})
	},

	//去文章详情页
	toArticleDetail: function (event) {
		let url = encodeURIComponent(event.currentTarget.dataset.link)
		let title = event.currentTarget.dataset.title
		wx.navigateTo({
			url: `../webview/webview?url=${url}&title=${title}`,
		})
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		this.data.articleList = {
			datas: [],
			curPage: 0,
		}
		this.getBanner()
		this.getTopArticles()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		if (this.data.articleList.curPage < this.data.articleList.pageCount) {
			this.getArticles()
		} else {
			wx.showToast({
				title: '没有更多数据啦~',
			})
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})