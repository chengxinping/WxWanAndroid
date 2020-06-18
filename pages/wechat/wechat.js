// pages/wechat/wechat.js


let api = require("../../utils/api.js")


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabCur: 0,
		wechatTree: [],
		swiperList: [],
		isRefresh: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getWechatTree()
	},

	//获取微信公众分类列表
	getWechatTree: function () {

		api.wechatTree().then(list => {
			list.forEach((item, index) => {
				this.data.swiperList[index] = {
					datas: [],
					curPage: 0,
				}
			})
			this.setData({
				wechatTree: list,
				swiperList: this.data.swiperList
			})
			let cid = list[0].id
			api.articleList(1, {
				cid: cid
			}).then(articleBody => {
				this.saveSwiperList(0, articleBody, true)
			})
		})
	},

	tabChange: function (event) {
		let index = event.detail.index
		let id = this.data.wechatTree[index].id
		this.setData({
			tabCur: index
		})

		if (this.data.swiperList[index].datas.length > 0) {
			return
		}


		this.getArticleList(1, id,true)

	},

	swiperChange: function (event) {
		let index = event.detail.current
		let id = this.data.wechatTree[index].id
		this.setData({
			tabCur: index
		})


		if (this.data.swiperList[index].datas.length > 0) {
			return
		}

		this.getArticleList(1, id, true)
	},

	getArticleList: function (page, id, isRefresh) {
		api.articleList(page, {
			cid: id
		}).then(data => {
			this.saveSwiperList(this.data.tabCur, data, isRefresh)
		})
	},

	saveSwiperList: function (index, data, isRefresh) {
		if (isRefresh) {
			this.data.swiperList[index].datas = data.datas
		} else {
			this.data.swiperList[index].datas.push(...data.datas)
		}
		this.data.swiperList[index].curPage = data.curPage
		this.data.swiperList[index].pageCount = data.pageCount
		let key = 'swiperList[' + index + ']';
		this.setData({
			[key]: this.data.swiperList[index],
			isRefresh: false
		})
	},

	//列表下拉刷新
	refresh: function () {
		if (this._freshing) return
		this._freshing = true
		let index = this.data.tabCur
		let id = this.data.wechatTree[index].id
		this.getArticleList(1, id, true)
		this._freshing = false
	},

	//列表下拉加载更多
	loadMore: function () {
		let index = this.data.tabCur
		let id = this.data.wechatTree[index].id
		if (this.data.swiperList[index].curPage < this.data.swiperList[index].pageCount) {
			this.getArticleList(this.data.swiperList[index].curPage, id, false)
		} else {
			wx.showToast({
				title: '没有更多数据啦~',
			})
		}
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

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})