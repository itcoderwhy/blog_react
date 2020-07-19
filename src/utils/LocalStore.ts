/**
 *  简单封装本地存储，供外部使用
 */

const store = window.localStorage

class LocalStore {
	/**
	 * 设置数据 如果value 是 object 会调用JSON.stringify 自动转换为字符串
	 */

	public static set(key: string, value: any) {
		if (!store) {
			return
		}

		let v = value

		try {
			if (typeof value === 'object') {
				v = JSON.stringify(v)
			}
			store.setItem(key, v)
		} catch (error) {
			// 错误处理
		}
	}

	/**
	 * 直接获取 --- 原始数据
	 */

	public static get(key: string) {
		if (!store) {
			return
		}

		return store.getItem(key)
	}

	/**
	 * 获取的时候转换为JSON
	 */

	public static get2Json(key: string) {
		if (!store) {
			return
		}

		const data = store.getItem(key)

		if (data) {
			try {
				return JSON.parse(data)
			} catch (error) {}
		}

		return null
	}

	/**
	 * 删除
	 */
	public remove(key: string) {
		if (!store) {
			return
		}

		try {
			store.removeItem(key)
		} catch (error) {}
	}
}

export default LocalStore
