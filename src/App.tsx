import React from 'react'
import { Button } from 'antd'
import { setRetryTip } from './redux/saga/actions/common'
// useSelector 获取全局状态的hooks
import { useDispatch, useSelector } from 'react-redux'
import { SET_MENU } from './redux/thunk/actions/menu'
import { TEST } from './redux/thunk/actions/test'
import {getMenuData} from './redux/thunk/thunks/menu'
function App() { 
	const dispatch = useDispatch()
	const { retryTip } = useSelector((state: IState) => state.common)

	const handleTestReduxClick = () => {

     const action = getMenuData({
		 message: '异步请求'
	 })

		dispatch(action)
	}
	console.log(retryTip)
	return (
		<div className="App">
			hello react typescript
			<Button type="primary" onClick={handleTestReduxClick}>
				按钮
			</Button>
		</div>
	)
}

export default App
