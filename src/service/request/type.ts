import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface HYInterceptors<T> {
  requestSuccessFn?: (config: any) => any
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
// 拦截器： 蒙版loading/token/修改配置
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>
}
