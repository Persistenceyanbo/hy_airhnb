import { LOGIN_TOKEN } from '@/global/constants'
import HYRequest from '@/service/request'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
// import './login/login.ts'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log(1111)

      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // typeof config.headers.set === 'function' &&
        //   config.headers.set('Authorization', `Bearer ${token}`)
        // config.headers['Authorization'] = `Bearer ${token}`
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default hyRequest
