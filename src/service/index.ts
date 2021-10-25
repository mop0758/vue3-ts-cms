// service 统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      // console.log('请求成功时的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败时的拦截')
      return err
    },
    responseInterceptor: (config) => {
      // console.log('响应成功时的拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败时的拦截')
      return err
    }
  }
})

export default hyRequest
