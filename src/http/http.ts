/**
 * 基于axios 二次封装
 */

import AxiosInstance, {
	AxiosStatic,
	AxiosPromise,
	AxiosError,
	AxiosResponse,
	AxiosRequestConfig,
} from 'axios'
import { message, notification } from 'antd'

import store from '../redux'

import LocalStore from '../utils/LocalStore'
import { setRetryTip } from '../redux/saga/actions/common'
import { resolve } from 'dns'

//  定义一个请求的参数类型声明
type requestFn = (
	url: string,
	params?: Object,
	data?: Object | null
) => AxiosPromise

class Http {
	// 请求对象
	private axios: AxiosStatic = AxiosInstance
	// 请求失败时的，重试请求的间隔时间
	private retryDelay: number = 1000
	// 重试的次数
	private retry: number = Number(process.env.REACT_APP_RETRY) || 4

	// 在constructor 里面进行初始化设置
	constructor() {
		const { axios } = this
		axios.defaults.timeout = 10000
		axios.defaults.baseURL = process.env.REACT_APP_API_URL
		axios.defaults.headers = {
			'Content-Type': 'application/json;charset=UTF-8',
		}

		// 请求拦截器/响应拦截器
		this.useInterceptResponse()
		this.useUInterceptRequest()
	}
	// 请求拦截器
	useInterceptResponse() {
		this.axios.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				// 这里传进来的 config 是我们发出请求的时候 ，默认的 config配置，包括url,method,data ....
				const newConfig = config
				// 封装一个获取登录状态的工具函数，在里面处理token保存贺token国企刷新token的逻辑
				// cosnt token = loginUtils.getToken()
				const token = await 'abs.abs.bas'
				if (token) newConfig.headers.authtoken = token
				return newConfig
			},
			(error: AxiosError) => Promise.reject(error)
		)
	}
	// 响应拦截器
	useUInterceptRequest() {
		this.axios.interceptors.response.use(
			(res: AxiosResponse) => {
				// errorCode 这个字段是 后段返回的 有可能是 status 也有可能是 success
				if (res.data.errorCode === '101010500') {
					message.error('服务器错误，请联系管理员')
				}

				// token 过期,需要跳转到 login 页面，但是不在这里处理
				if (res.data.errorCode === '102022001') {
					message.error('身份信息已过期，请重新登陆')
				}
				// 其他情况
				if (res.data.errorCode !== 0) {
					message.error(res.data.errMsg || '服务器异常')
				}

				// 如果还有别的逻辑，就加在这里

				return Promise.resolve(res.data)
			},
			(error: AxiosError) => {
				// 请求出错，走到这里，多半是服务器的问题
				// 先处理 多次请求失败的情况

				const { config } = error

				let retryCont = config.headers['axions-retry'] || 0

				if (retryCont >= this.retry) {
					// 告诉 redux 重试次数已超过指定次数，因该 修改状态，然后组件里自动感应，变为true过后，提醒用户
					store.dispatch(setRetryTip(true))
					return Promise.reject(error)
				}

				retryCont += 1

				const backoff = new Promise((resolve) => {
					setTimeout(() => {
						resolve()
					}, this.retryDelay || 1000)
				})

				// 修改重试次数
        config.headers['axions-retry'] = retryCont
        
        

				//  必须要在 error 中的config 中去显示绑定才会触发执行
				return backoff.then(() => {
					this.axios(config)
				})
			}
		)
	}

	/**
	 * 封装一个底层的公用方法
	 * type: 请求方法 GET,POST
	 * url:请求地址
	 * options: 请求的参数
	 * isComplex: 是否平铺参数，一般用于get但是不是绝对的，eg {a:1,b:1} --> a=1&b=2
	 * */
	private fetchData(
		type: string,
		url: string,
		options?: Object,
		isComplex?: boolean
	) {
		if (isComplex) {
			return this.axios[type](url, null, options)
		}

		return this.axios[type](url, options)
	}

	/**
	 * get请求封装
	 * url:请求地址
	 * params: 请求参数
	 */

	public get: requestFn = (url, params) => {
		//  get 可以不传参数
		if (!params) {
			return this.fetchData('get', url)
		}

		// 因为get请求很有可能会被缓存，所以我们要给一个随机参数
		// 实现：因为params是已经存在的，需要扩展一个随机数的变量
		const newParams = Object.assign(params, {
			[`dmx${new Date().getTime()}`]: 1,
		})

		return this.fetchData('get', url, { params: newParams })
	}

	/***
	 * 因为 post put patch delete 逻辑处理是一样的，所以直接可以把底层函数封装出啦直接调用
	 */

	private commonRequest(
		type: string,
		url: string,
		params?: Object,
		data?: Object | null
	): AxiosPromise {
		// 合并一下参数
		let options: Object = {
			params,
			data,
		}

		if (params && data === undefined) {
			options = {
				data: params,
			}
		}
		if (data === null) {
			options = {
				params,
			}
		}

		return this.fetchData(type, url, options, true)
	}

	/**
	 * post请求封装
	 * url:请求地址
	 * params: 请求的url上加参数 eg:?action=123
	 * data: 请求体 body 上的参数
	 */

	public post: requestFn = (url, params, data) => {
		return this.commonRequest('post', url, params, data)
	}

	/**
	 * put请求封装
	 * url:请求地址
	 * params: 请求的url上加参数 eg:?action=123
	 * data: 请求体 body 上的参数
	 */

	public put: requestFn = (url, params, data) => {
		return this.commonRequest('put', url, params, data)
	}

	/**
	 * patch请求封装
	 * url:请求地址
	 * params: 请求的url上加参数 eg:?action=123
	 * data: 请求体 body 上的参数
	 */

	public patch: requestFn = (url, params, data) => {
		return this.commonRequest('patch', url, params, data)
	}

	/**
	 * delete请求封装
	 * url:请求地址
	 * params: 请求的url上加参数 eg:?action=123
	 * data: 请求体 body 上的参数
	 */

	public delete: requestFn = (url, params, data) => {
		return this.commonRequest('delete', url, params, data)
	}
}
