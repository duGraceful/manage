/*
 * utils.js
 * 工具类js
 */

import axios from 'axios'
import router from 'vue-router'


const ls = window.localStorage
// const DEV_DOMAIN = '//www.anthub.top:8080'
// const DOMAIN = '//www.anthub.top:8080'
const DEV_DOMAIN = '/api'
const DOMAIN = '/api'

const isDev = process.env.NODE_ENV !== 'production'
const baseUrlDomainGroup = isDev ? DEV_DOMAIN : DOMAIN

/**
 * 获取url参数
 * @param {*} paraName
 */
const getUrlParam = (paraName) => {
  var url = window.document.location.toString()
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

console.log('token--->', getUrlParam('token'))
let token = getUrlParam('token')
if (token) {
  ls.setItem('token', token)
}

token = ls.getItem('token')
/* 一些请求的全局配置 */
axios.defaults.baseURL = baseUrlDomainGroup
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000

//GET 请求
function GET(url, params) {

  return axios
    .get(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(reqResult)
    .catch(reqErr)
}

/**
 * POST 请求
 * @param {*} url
 * @param {*} params
 * @param {*} hasLoad
 */
function POST(url, params, hasLoad = true) {
  if (hasLoad) {
    var load = document.createElement("div");
    load.className = 'loading'
    load.id = 'loading'
    load.innerText = "加载中...";
    document.body.appendChild(load);
  }
  if (!token) {
    this.$router.push('/login')
  }

  return axios
    .post(url, params, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(reqResult)
    .catch(reqErr)
}


/**
 * 响应结果统一处理
 * @param {Object} res 响应的结果
 * @returns {Object} 响应结果的数据
 */
function reqResult(res) {
  let data = null

  if (res.status === 200) {
    if (res.data) {
      if (res.data.code && (res.data.code === '1000')) {
        data = res.data.body
        // if (data && parseInt(res.data.expiretime) > 0) {
        //   let key = res.config.url.replace(res.config.baseURL, '') + (res.config.cacheKey || '')
        //   if (key.indexOf('/') !== 0) key = '/' + key
        //   setCache(key, res.data.expiretime, data)
        // }
      } else {
        throw {
          code: res.data.code,
          msg: res.data.message + (res.data.data ? (',' + res.data.data) : '')
        } // eslint-disable-line
      }
    } else {
      throw 'Request failed, ' + JSON.stringify(res) // eslint-disable-line
    }
    // Indicator.close()
    let load = document.getElementById('loading')
    if (load) {
      document.body.removeChild(load)
    }
    return data
  }

}
/**
 * 响应异常统一处理
 * @param {Object} 响应的异常
 */
function reqErr(e) {
  let load = document.getElementById('loading')
  if (load) {
    document.body.removeChild(load)
  }
  throw e // eslint-disable-line
}


function _getDate(datetime) {
  if (typeof datetime === 'string') {
    let arr = datetime.split(/[- : \/ T]/)
    if (arr[0].length === 4) arr[1] = arr[1] - 1
    datetime = new Date(...arr)
  }
  return datetime
}
/*
 * 时间格式化
 * datetime:String,必须,要格式化的时间字符串
 * format:String,可无,时间的格式(注意格式中对应的字母),默认为'yyyy-MM-dd HH:mm:ss' 全角ｍ表示英文月份
 */
function DateFormat(datetime, format = 'yyyy-MM-dd HH:mm:ss') {
  let date = datetime
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  try {
    if (Object.prototype.toString.call(date) !== '[object Date]') date = _getDate(date)
    var o = {
      'ｍ+': month[date.getMonth()],
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
    return format
  } catch (e) {
    return datetime
  }
}

function renderTime(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

// function getInervalHour(startDate, endDate) {
//   var ms = endDate.getTime() - startDate.getTime();
//   if (ms < 0) return 0;
//   return Math.floor(ms / 1000 / 60 / 60);
// }

export {
  POST,
  GET,
  UploadQiniu,
  addUploadBoard,
  DateFormat,
  renderTime
}
