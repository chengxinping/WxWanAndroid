const base = require("./baseUrl")

let app = getApp();

function request(method, url, param, isShowLoading) {
    return new Promise(function (resolve, reject) {
        if (isShowLoading) {
            wx.showLoading({
                title: '加载中...',
                mask: true,
            });
            wx.request({
                url: url,
                data: param,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: method,
                success: (result) => {
                    if (isShowLoading) {
                        wx.hideLoading();
                    }
                    //接口正常
                    if (result.data.errorCode == '0') {
                        resolve(result.data.data)
                    } else {
                        wx.showToast({
                            title: result.data.errorMsg,
                            icon: 'none',
                            duration: 1500,
                        });
                        reject(result.data)
                    }
                },
                fail: () => {
                    if (isShowLoading) {
                        wx.hideLoading();
                    }
                    wx.showToast({
                        title: '服务器异常',
                        icon: 'none',
                        duration: 1500,
                    });
                },

            });
        }
    });

}

//get网络请求
function get(path, param = {}, isShowLoading = true) {
    return request("GET", base.baseUrl + path, param, isShowLoading)
}

//post网络请求
function post(path, param = {}, isShowLoading = true) {
    return request("POST", base.baseUrl + path, param, isShowLoading)
}


module.exports = {
    get: get,
    post: post
}