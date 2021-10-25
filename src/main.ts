import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'
import { setupStore } from './store'

// 全局注册的方法
// import { globalRegister } from './global'

// 封装的网络请求
// import hyRequest from './service'

// 全局引用el
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(globalRegister) //使用use，会默认把app当参数传给调用的方法

app.use(router)
app.use(store)
app.use(setupStore)
// app.use(ElementPlus)
app.mount('#app')

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求成功时的拦截')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应成功时的拦截')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//   })
