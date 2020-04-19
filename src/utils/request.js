import axios from 'axios'
import jsonBig from 'json-bigint'

import store from '../store/index'

import { message } from 'element-ui'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: '6000'
})

// 请求拦截器
request.interceptors.request.use(config => {

    // 每次登陆的时候将token插入到请求头中
    config.headers.authorization = store.state.userInfo.token
    return config
  }, error => {
    return Promise.reject(error)
})


// 处理大数字的问题
request.defaults.transformResponse = [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return data
    }
}]


// 响应拦截器
request.interceptors.response.use(response => {
    
    return response
}, error => {

    console.log(error.response)

    errorMsg(error.response)

    return Promise.reject(error)
})

// 异常处理
function errorMsg (error) {

  switch (error.status) {

    case 400:
      message.error('亲，您查看的资料出现了错误')
      break
    case 401:
      message.error('请检查token，可能已经过期，需要重新登陆')
      tokenOverdue(error)
      break
    case 403:
      message.error('抱歉您的权限还需要升级')
      break
    case 404:
      message.error('资源被狗狗调走了')
      break
    case 408:
      message.error('请求超时，请重试')
      break
    case 500:
      message.error('可爱的服务器好像奔溃了')
      break
    case 502:
      message.error('请仔细检查您的网络')
      break
    case 504:
      message.error('您的网络很慢，已经超时，请重试')
      break
    case 503:
      message.error('当前服务不支持')
      break 
    default:
      message.error('与服务器的连接断开了')
      break
  }
}

// token的过期处理
function tokenOverdue (error) {

  // 如果有token的话重新存储，刷新

  if (error.data.token) {

    // 将刷新的token重新存储到本地即可
    const userInfo = {
      ...store.getters.getuserInfo,
      token: error.data.token
    }
    
    store.commit('SET_USERINFO', userInfo)

  }

}

export default (method, url, data = null) => {

  method = method.toUpperCase()

  if (method === 'POST') {

    return request.post(url, data)

  } else if (method === 'GET') {

    return request.get(url, { params: data })

  } else if (method === 'DELETE') {

    return request.delete(url, { params: data })

  } else if (method === 'PUT') {

    return request.put(url, data)
  }

}
