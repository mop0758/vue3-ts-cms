import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 双问号 判断问号前面是undefined或者null 如果是，这执行 ?? 后面内容
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 这个拦截器是从cofig中取出的对应实例的拦截器
    // 请求时拦截
    // 第一个参数：成功时的函数回调
    // 第二个参数：失败时的函数回调
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 这个拦截器是从cofig中取出的对应实例的拦截器
    // 响应时拦截
    // 第一个参数：成功时的函数回调
    // 第二个参数：失败时的函数回调
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log('所有的实例都有的请求失败拦截')
        return err
      }
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的响应成功拦截')
        // 将loading移除
        // setTimeout(() => {
        this.loading?.close()
        // }, 3000)

        return res.data
      },
      (err) => {
        console.log('所有的实例都有的响应失败拦截')
        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果有单独的请求拦截，将config传进去，处理完毕后，再重新拿到config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 根据单个请求设置的showLoading状态，改变全局loading的显示状态
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance.request<any, T>(config).then(
        (res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading设置成true，这样不会影像下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果reslove出去
          resolve(res)
        },
        (err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        }
      )
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
