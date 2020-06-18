// pages/project/project.js

let api = require("../../utils/api.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabCur: 0,
		projectTree: [],
		swiperList: [],
		isRefresh: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getProjectTree()
	},

	tabChange: function (event) {
		console.log("tabChange")
		let index = event.detail.index
		let id = this.data.projectTree[index].id
		this.setData({
			tabCur: index
		})

		if (this.data.swiperList[index].datas.length > 0) {
			return
		}


		if (id == -1) {
			this.getNewProjects(1, true)
		} else {
			this.getProjectList(1, id, true)
		}
	},

	swiperChange: function (event) {
		console.log("swiperChange")
		let index = event.detail.current
		let id = this.data.projectTree[index].id
		this.setData({
			tabCur: index
		})


		if (this.data.swiperList[index].datas.length > 0) {
			return
		}

		if (id == -1) {
			this.getNewProjects(0, true)
		} else {
			this.getProjectList(0, id, true)
		}
	},


	/**
	 * 网络请求
	 */

	getProjectTree: function () {
		api.projectTree().then(list => {
			list.unshift({
				name: "最新项目",
				id: -1
			})
			list.forEach((item, index) => {
				this.data.swiperList[index] = {
					datas: [],
					curPage: 0,
				}
			})
			this.setData({
				projectTree: list,
				swiperList: this.data.swiperList
			})
			this.getNewProjects(0, true)
		})
	},

	getNewProjects: function (page, isRefresh) {
		api.newProjectList(page).then(list => {
			this.saveProjectList(0, list, isRefresh)
		})
	},


	getProjectList: function (page, id, isRefresh) {
		api.projectList(page, {
			cid: id
		}).then(data => {
			this.saveProjectList(this.data.tabCur, data, isRefresh)
		})
	},

	saveProjectList: function (index, data, isRefresh) {
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
		let id = this.data.projectTree[index].id
		if (id == -1) {
			this.getNewProjects(0, true)
		} else {
			this.getProjectList(0, id, true)
		}
		this._freshing = false
	},

	//列表下拉加载更多
	loadMore: function () {
		let index = this.data.tabCur
		let id = this.data.projectTree[index].id
		console.log(this.data.swiperList[index])
		if (this.data.swiperList[index].curPage < this.data.swiperList[index].pageCount) {
			if (id == -1) {
				this.getNewProjects(this.data.swiperList[index].curPage, false)
			} else {
				this.getProjectList(this.data.swiperList[index].curPage, id, false)
			}

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