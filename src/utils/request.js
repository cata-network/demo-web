import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import { getUserInfo } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: "http://101.201.198.241:1777/api",
  // withCredentials: true, // send cookies when cross-domain requests
  
  // timeout: 1 // request timeout
  timeout: 1200000 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   // config.headers['Authorization'] = 'Bearer ' + getToken()
    //   // config.headers['X-Token'] = 'Bearer ' + getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    let from = location.hash.replace('#', '')
    let rootUrl = location.href.substring(0, location.href.indexOf('/#/'))

    // if the custom code is not 20000, it is judged as an error.
    

      return res
  },
  error => {
    console.log(error) // for debug
    // Message({
    //   message: error,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
